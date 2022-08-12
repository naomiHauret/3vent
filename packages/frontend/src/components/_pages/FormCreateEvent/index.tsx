import Button from '@components/Button'
import FormField from '@components/FormField'
import FormInput from '@components/FormInput'
import FormTextarea from '@components/FormTextarea'
import { IconCamera } from '@components/Icons'
import { createEffect, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import DialogTrackProgressDataIndexing from './DialogTrackProgressDataIndexing'
import useCreateEvent from './useCreateEvent'

export const FormCreateEvent = () => {
  const {
    storeForm,
    stateIndexEvent,
    stateUploadEventData,
    eventImageSrc,
    onInputEventImageChange,
    stateUploadEventImage,
    apiDialogModalTrackProgress,
    txReceipt,
  } = useCreateEvent()
  const { form } = storeForm
  
  return (
    <>
      {/* @ts-ignore */}
      <form use:form>
        <fieldset
          classList={{
            'animate-pulse pointer-events-none': stateIndexEvent.isLoading,
          }}
          class="space-y-6 mb-8"
        >
          <FormField hasError={storeForm.errors().name !== null}>
            <FormField.InputField>
              <FormField.Label hasError={storeForm.errors().name !== null} for="name">Your event name</FormField.Label>
              <FormField.Description id="input-name-description">The name of your event</FormField.Description>
              <FormInput
                required
                aria-invalid={storeForm.errors().name !== null ? "true" : "false"}
                hasError={storeForm.errors().name !== null}
                class="w-full"
                type="text"
                name="name"
                id="name"
                aria-describedby="input-name-description input-name-helpblock"
              />
            </FormField.InputField>
            <FormField.HelpBlock id="input-name-helpblock">An event name is required.</FormField.HelpBlock>
          </FormField>
          <FormField hasError={storeForm.errors().image !== null}>
            <FormField.InputField>
              <div class="flex flex-col lg:justify-between lg:flex-row lg:space-x-6">
                <div>
                  <FormField.Label hasError={storeForm.errors().image !== null} for="image">Your event image</FormField.Label>
                  <FormField.Description id="input-image-description">
                    Click on the picture to upload an image from your files.
                  </FormField.Description>
                </div>
                <div class="input-file_wrapper h-48 w-48 rounded-md overflow-hidden relative bg-neutral bg-opacity-50">
                  <input
                    onChange={(e) => {
                      //@ts-ignore
                      onInputEventImageChange(e.target.files[0])
                    }}
                    class="absolute w-full h-full block inset-0 z-30 cursor-pointer opacity-0"
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    required
                    aria-describedby="input-image-description input-image-helpblock"
                  />
                  <div class="absolute w-full h-full rounded-md inset-0 z-20 bg-base-100 bg-opacity-40 flex items-center justify-center">
                    <IconCamera class="text-2xl text-black text-opacity-75" />
                  </div>
                  <Show when={eventImageSrc() !== null}>
                    <img
                      alt=""
                      loading="lazy"
                      width="112"
                      height="112"
                      class="absolute w-full h-full object-cover block z-10 inset-0"
                      src={eventImageSrc()}
                    />
                  </Show>
                </div>
              </div>
            </FormField.InputField>
            <FormField.HelpBlock id="input-image-helpblock">An image with a 1:1 ratio.</FormField.HelpBlock>
          </FormField>

          <FormField hasError={storeForm.errors().description !== null}>
            <FormField.InputField>
              <FormField.Label hasError={storeForm.errors().description !== null} for="description">Description</FormField.Label>
              <FormField.Description id="input-description-description">
                What your event is about.
              </FormField.Description>
              <FormTextarea
                hasError={storeForm.errors().description !== null}
                class="w-full "
                name="description"
                id="description"
                aria-describedby="input-description-description input-description-helpblock"
                required
                rows="10"
              />
            </FormField.InputField>
            <FormField.HelpBlock id="input-description-helpblock">A description is required.</FormField.HelpBlock>
          </FormField>

          <FormField hasError={storeForm.errors().timestamp !== null}>
            <FormField.InputField>
              <FormField.Label hasError={storeForm.errors().timestamp !== null} for="timestamp">Date and time</FormField.Label>
              <FormField.Description id="input-timestamp-description">
                At what time does your event start ?
              </FormField.Description>
              <FormInput
                class="w-full "
                name="timestamp"
                id="timestamp"
                aria-describedby="input-timestamp-description input-timestamp-helpblock"
                required
                hasError={storeForm.errors().timestamp !== null}
                type="datetime-local"
                min={new Date().toISOString().substring(0, 16)}
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
              />
            </FormField.InputField>
            <FormField.HelpBlock id="input-timestamp-helpblock">
              Timezone: ({Intl.DateTimeFormat().resolvedOptions().timeZone}) <br />A date and time are required.
            </FormField.HelpBlock>
          </FormField>

          <FormField hasError={storeForm.errors().maxCapacity !== null}>
            <FormField.InputField>
              <FormField.Label  hasError={storeForm.errors().maxCapacity !== null}for="maxCapacity">Maximum capacity</FormField.Label>
              <FormField.Description id="input-maxCapacity-description">
                Limit the number of spots available for your event.
              </FormField.Description>
              <FormInput
                hasError={storeForm.errors().maxCapacity !== null}
                min="1"
                step="1"
                required
                class="w-full"
                type="number"
                name="maxCapacity"
                id="maxCapacity"
                aria-describedby="input-maxCapacity-description input-maxCapacity-helpblock"
              />
            </FormField.InputField>
            <FormField.HelpBlock id="input-maxCapacity-helpblock">
              The maximum capacity is required and must be a number superior or equal to 1.
            </FormField.HelpBlock>
          </FormField>

          <FormField hasError={storeForm.errors().deposit !== null}>
            <FormField.InputField>
              <FormField.Label hasError={storeForm.errors().deposit !== null} for="deposit">Refundable deposit</FormField.Label>
              <FormField.Description id="input-deposit-description">
                Require a refundable deposit (in MATIC) to reserve one spot at your event.
              </FormField.Description>
              <FormInput
                hasError={storeForm.errors().deposit !== null}
                min="0"
                step="any"
                required
                class="w-full"
                type="number"
                name="deposit"
                id="deposit"
                aria-describedby="input-deposit-description input-deposit-helpblock"
              />
            </FormField.InputField>
            <FormField.HelpBlock id="input-deposit-helpblock">
              The refundable deposit is required and must be a number superior or equal to 0.
            </FormField.HelpBlock>
          </FormField>

          <FormField hasError={storeForm.errors().link !== null}>
            <FormField.InputField>
              <FormField.Label hasError={storeForm.errors().link !== null} for="link">Event link</FormField.Label>
              <FormField.Description id="input-link-description">A link to your virtual event.</FormField.Description>
              <FormInput
                hasError={storeForm.errors().link !== null}
                required
                class="w-full"
                type="url"
                name="link"
                id="link"
                aria-describedby="input-link-description input-link-helpblock"
              />
            </FormField.InputField>
            <FormField.HelpBlock id="input-link-helpblock">
              The event link is required and must be a valid URL.
            </FormField.HelpBlock>
          </FormField>
        </fieldset>
        <Button
          class="w-full xs:w-auto"
          disabled={stateIndexEvent.isLoading || !storeForm.isValid()}
          isLoading={stateIndexEvent.isLoading}
        >
          <Show when={stateIndexEvent.isError === false && !stateIndexEvent.isLoading}>Create event</Show>
          <Show when={stateIndexEvent.isLoading}>Creating event...</Show>
          <Show when={stateIndexEvent.isError === true}>Try again</Show>
        </Button>
      </form>

      {apiDialogModalTrackProgress().isOpen && (
        <Portal>
          <DialogTrackProgressDataIndexing
            api={apiDialogModalTrackProgress}
            stateUploadEventImage={stateUploadEventImage}
            stateUploadEventData={stateUploadEventData}
            stateIndexEvent={stateIndexEvent}
            txReceipt={txReceipt}
          />
        </Portal>
      )}
    </>
  )
}

export default FormCreateEvent
