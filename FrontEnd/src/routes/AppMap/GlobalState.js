class MyClass {
    // class constructor, equivalent to
    // the function body of a constructor
    constructor() {
      const privateVariable = 'private value'; // Private variable at the constructor scope
      this.publicVariable = 'public value'; // Public property
  
      this.privilegedMethod = function() {
        // Public Method with access to the constructor scope variables
        console.log(privateVariable);
      };
    }
  static zoomval=0;
    // Prototype methods:
    publicMethod() {
      console.log(this.publicVariable);
    }
  
    // Static properties shared by all instances
    static staticProperty = 'static value';
  
    static staticMethod() {
      console.log(this.staticProperty);
    }
  }