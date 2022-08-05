const DialogTrackProgress = (props) => {
  return (
    <>
      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="min-h-screen px-4 flex items-end justify-center">
          <div class="bg-neutral bg-opacity-50 fixed inset-0" {...props.api().backdropProps} />
          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <div
            class={`bg-base-100 border border-neutral z-10 rounded-xl inline-block w-full max-w-screen-xs my-8 overflow-hidden align-middle`}
            {...props.api().underlayProps}
          >
            <div {...props.api().contentProps}>
              <div class="border-bb border-neutral">
                <h2
                  class="px-4 pt-3 pb-2 font-semibold font-display tracking-widest text-ex"
                  {...props.api().titleProps}
                >
                  Track progress
                </h2>
              </div>

              <div {...props.api().descriptionProps} class="font-medium px-6 pt-4 pb-6">
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DialogTrackProgress
