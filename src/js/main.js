
const el = selector => document.querySelector(selector);

const getShortenedUrl = async (url) => {
  const result = await fetch("https://api.hurl.cf/shortenUrl", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  });
  console.log('shortened response', result);
  return result;
}

const shortenUrl = async (event) => {
  console.log(event);
  const inputUrl = el("#inputUrl").value;
  const response = await getShortenedUrl(inputUrl);
  // validate for existing input url
  el(".output-section").classList.remove("hidden");
  const outputUrl = el("#outputUrl");
  outputUrl.value = "hurl.cf/akldj6s";
}

const copyLink = () => {
  el("#outputUrl").select();
  document.execCommand("copy");
  el(".status-section").classList.remove("hidden");
}

const showApiSection = () => {
  el(".curl-code").classList.remove("hidden").select();
}
