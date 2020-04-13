
const el = selector => document.querySelector(selector);

const getShortenedUrl = async (url) => {
  return new Promise((resolve, reject) => {
    fetch("https://api.hurl.cf/shortenUrl", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((response) => resolve(response))
    .catch((error) => reject(error));
  });
}

const shortenUrl = async (event) => {
  const inputUrl = el("#inputUrl").value;
  const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  if (regex.test(inputUrl)) {
    el(".error-section").classList.add("hidden");
    const { url } = await getShortenedUrl(inputUrl);
    // validate for existing input url
    el(".output-section").classList.remove("hidden");
    const outputUrl = el("#outputUrl");
    outputUrl.value = url;
  } else {
    el(".error-section").classList.remove("hidden");
  }
}

const copyLink = () => {
  el("#outputUrl").select();
  document.execCommand("copy");
  el(".status-section").classList.remove("hidden");
}

const showApiSection = () => {
  el(".curl-code").classList.remove("hidden");
}
