const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt event fired');
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  console.log('deferredPrompt after beforeinstallprompt:', deferredPrompt);
  // Update UI notify the user they can add to home screen
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  console.log('Install button clicked');
  console.log('deferredPrompt before prompt:', deferredPrompt);
  // Check if deferredPrompt is not undefined
  if (deferredPrompt) {
    // hide our user interface that shows our A2HS button
    butInstall.style.display = 'none';
    // Show the promptbutInstall.style.display = 'none';
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  } else {
    console.log('beforeinstallprompt event has not been fired');
  }
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed');
});