// Personalize.registerAction(conditions, callback);
// conditions = Array of condition names that must all be true to execute the callback
// callback = Function that executes when all conditions are true

var output = document.querySelector("#output");

Personalize.registerAction(["Is Not From Google"], function() {
  output.innerHTML += "This page is not from Google <br/>";
});

Personalize.registerAction(["Is Not Mobile"], function() {
  output.innerHTML += "This page is not mobile <br/>";
});

Personalize.registerAction(["Is Not From Google", "Is Mobile"], function() {
  output.innerHTML += "This page is not from Google and is Mobile <br/>";
});
