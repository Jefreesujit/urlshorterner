
const el = selector => document.querySelector(selector);

const getShortenedUrl = async (url) => {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3009/shortenUrl", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(response => response.json())
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
}

const shortenUrl = async (event) => {
  console.log(event);
  const inputUrl = el("#inputUrl").value;
  const { url } = await getShortenedUrl(inputUrl);
  // validate for existing input url
  el(".output-section").classList.remove("hidden");
  const outputUrl = el("#outputUrl");
  outputUrl.value = url;
}

const copyLink = () => {
  el("#outputUrl").select();
  document.execCommand("copy");
  el(".status-section").classList.remove("hidden");
}

const showApiSection = () => {
  el(".curl-code").classList.remove("hidden").select();
}
