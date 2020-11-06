var selem = document.currentScript;

if (location.protocol !== 'https:') {
  var err = document.createElement('div');
  err.className = "replit-auth-error";
  err.textContent = 'ERROR: HTTPS is required.';
  selem.parentNode.insertBefore(err, selem);
  function join() {
    button = document.getElementById("linked")
    button.innerText = "ERROR: HTTPS is required."
  }
} else {
  // onpointerdown="ripplet(arguments[0])"
  var button = document.createElement('button');
  button.className = "button-primary";
  button.textContent = 'Login';
  button.style.cursor = 'pointer';
  button.style.width = '100px'

  function join() {
    button.click()
  }
}

button.onclick = function() {
  window.addEventListener('message', authComplete);

  var h = 500;
  var w = 450;
  var left = (screen.width / 2) - (w / 2);
  var top = (screen.height / 2) - (h / 2);

  var authWindow = window.open(
    'https://repl.it/auth_with_repl_site?domain=' + location.host,
    '')

  function authComplete(e) {
    if (e.data !== 'auth_complete') {
      return;
    }

    window.removeEventListener('message', authComplete);
    authWindow.close();
    if (selem.attributes.authed.value) {
      eval(selem.attributes.authed.value);
    } else {
      location.reload();
    }
  }
}

selem.parentNode.insertBefore(button, selem);