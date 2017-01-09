// Personalize.registerCondition(condition, callback);
// condition = String representing the name of the condition
// callback = Function that tests the condition, must always return a boolean

Personalize.registerCondition("Is Not From Google", function() {
  return document.referrer.indexOf("google") === -1;
});

Personalize.registerCondition("Is Mobile", function() {
  var width = window.innerWidth||e.clientWidth||g.clientWidth
  return width <= 640;
});

Personalize.registerCondition("Is Not Mobile", function() {
  var width = window.innerWidth||e.clientWidth||g.clientWidth
  return width > 640;
});
