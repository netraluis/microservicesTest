export const natsWrapper = {
  client: {
    /**
     * This was a false function
     *   publish: (subject: string, data: string, callback: () => void) => {
     *   callback();
     * }
    */
   /**
    * This is a mock function we can keep track and have expectations so we can we 100% the publish function was called
    * mockImplementation --> custom implementation
    */
    publish: jest.fn().mockImplementation(
      (subject: string, data: string, callback: () => void) => {
        callback();
      }
    )
  }
}