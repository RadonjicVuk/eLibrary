class Cookies {
  create(data) {
    document.cookie = "token=" + JSON.stringify(data.accessToken);
  }

  getCookie() {
    let name = "token=";
    let ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }
}
