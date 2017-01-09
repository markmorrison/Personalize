var PersonalizationEngine = function() {
  // Event emitter used for triggering actions when conditions are met
  var PersonalizeEvents = new EventEmitter();

  // Locally stored conditions and actions
  var conditions = {};
  var conditionsState = {};
  var actions = [];

  // Constructor for creating new actions
  var Action = function(localConditions, callback) {
    var localConditions = localConditions || [];

    function registerConditions() {
      // Store the initial state of the condition for this action
      localConditions.forEach(function(conditionName) {
        conditionsState[conditionName] = false;

        // Set an event to listen for when the condition passes
        PersonalizeEvents.on(conditionName, function() {
          attemptAction();
        });
      });
    }

    // Check if all of the locally stored conditions are true
    function checkConditions() {
      for (var i = 0; i < localConditions.length; i++) {
        if(!conditionsState[localConditions[i]]) return false;
      }

      return true;
    }

    // If all locally-stored conditions are true, execute the callback action
    function attemptAction() {
      return !!checkConditions() ? callback() : false;
    }

    function init() {
      registerConditions();
    }

    init();

    return {
      conditions: localConditions,
      attemptAction: attemptAction,
      checkConditions: checkConditions
    };
  }

  // Exposed wrapper for creating new actions
  function registerAction(conditions, callback) {
    return actions.push(new Action(conditions, callback));
  }

  // Function for adding new conditions
  function registerCondition(conditionName, testingFunction) {
    conditions[conditionName] = testingFunction;
  }

  // When a condition's callback returns true, fire this function
  function conditionIsTrue(conditionName) {
    conditionsState[conditionName] = true;
    PersonalizeEvents.emit(conditionName);
  }

  // Test all conditions and fire events if true
  function testAllConditions() {
    Object.keys(conditions).forEach(function(conditionName) {
      return testCondition(conditionName);
    })
  }

  // For testing a specific condition on the fly
  function testCondition(conditionName) {
      return conditions[conditionName]() ? conditionIsTrue(conditionName) : false;
  }

  function init() {
    testAllConditions();
  }

  // Wait until both conditions and actions have been processed to initialize
  document.addEventListener("DOMContentLoaded", function() {
    init();
  });

  return {
    actions: actions,
    conditions: conditions,
    conditionsState: conditionsState,
    registerAction: registerAction,
    registerCondition: registerCondition,
    testAllConditions: testAllConditions,
    testCondition: testCondition
  }
};

var Personalize = new PersonalizationEngine();
