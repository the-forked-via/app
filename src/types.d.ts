declare global {
    interface Navigator {
      keyboard: {
        unlock(): Promise<void>;
        lock(): Promise<void>;
      };
    }
  
    declare var __DEFINITION_HASH__: string;
}

export default {}
  