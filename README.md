# Personalize
Personalize was created for segmenting and personalizing website content and functionality based on a series conditions and corresponding actions.

## Fundamentals
Personalize operates by registering actions (callback functions) to execute when a set of conditions have been met. Those conditions are individually registered with their own functions that return true or false. When all of the conditions are met, it executes the action's callback function. An example is included in the `/example` folder. 

### Conditions
Conditions are set with the `Personalize.registerCondition(condition_name, callback)` function in which you pass a `String` for the condition name and a callback `function` that returns a boolean based on whether your condition is true or false.

### Actions
Actions are the result of a combination of true conditions. They are set with the `Personalize.registerAction(conditions, callback)` function in which you pass an `array` of `strings` which correspond to existing conditions (as set by `Personalize.registerCondition()`). The second parameter is the `callback` function to execute when all of those conditions have been met.

## Under the Hood
- When an action is registered it records the state of each of the associated conditions
- When a condition is registered, it stores the condition with it's corresponding check function
- On page load, the library loops through all conditions and executes their functions
- If the condition is met, it fires an event to notify all actions that contain that condition that it has been met (via an event emitter)
- Each of those actions check if its other conditions have also been met
- If all of the other conditions have previously been met, it fires the action's callback

#### Todos
- Move the check conditions function outside the constructor so it's not re-defined every time a new action is defined
- Think of a better name for the project, actions, and conditions

#### Other Notes
- No dependencies
- Actions can have conditions that have not been defined/registered without throwing an error
