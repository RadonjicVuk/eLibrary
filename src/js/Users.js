class Users {
  userId = "";
  username = "";
  email = "";
  password = "";
  cookie = "";
  barCode = "";
  apiUrl = "http://localhost:8080/api";

  // *Napravi korisnika
  create() {
    let data = {
      name: this.username,
      email: this.email,
      password: this.password,
    };

    data = JSON.stringify(data);

    fetch(this.apiUrl + "/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    }).then((response) => {
      if (response.status === 201) {
        $(".verification").removeClass("hidden");
        $(".register").addClass("hidden");
      } else {
        alert("mail je vec iskoriscen");
      }
    });
  }

  // *Uloguj korisnika
  login() {
    let data = {
      email: this.email,
      password: this.password,
    };

    data = JSON.stringify(data);

    fetch(this.apiUrl + "/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        let cookie = new Cookies();
        cookie.create(data);
        window.location.href = "adminPage.html";
      });
  }

  verify(verCode) {
    let data = {
      name: this.username,
      email: this.email,
      password: this.password,
      code: verCode,
    };

    data = JSON.stringify(data);

    fetch(this.apiUrl + "/user/verify", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        let cookie = new Cookies();
        cookie.create(data);
        window.location.href = "adminPage.html";
      });
  }

  delete(verCode) {
    let data = {
      id: this.userId,
    };

    let headers = new Headers();
    headers.append("authorization", verCode);
    headers.append("Content-Type", "application/json");

    data = JSON.stringify(data);

    fetch(this.apiUrl + "/user/delete", {
      method: "delete",
      headers: headers,
      body: data,
    }).then((response) => {
      if (response.status === 201) {
        let cookie = new Cookies();
        cookie.deleteCookieUser();
        window.location.href = "adminPage.html";
      } else if (response.status === 410) {
        let cookie = new Cookies();
        cookie.deleteCookie();
        window.location.href = "index.html";
      }
    });
  }

  addBookToUser() {
    let data = {
      id: this.barCode,
      userId: this.userId,
    };

    let headers = new Headers();
    headers.append("authorization", this.cookie);
    headers.append("Content-Type", "application/json");

    data = JSON.stringify(data);

    fetch(this.apiUrl + "/user/addBook", {
      method: "put",
      headers: headers,
      body: data,
    }).then((response) => {
      if (response.status === 201) {
        window.location.href = "adminUsers.html";
      } else if (response.status === 410) {
        let cookie = new Cookies();
        cookie.deleteCookie();
        window.location.href = "index.html";
      } else if (response.status === 403) {
        alert("Korisnik vec ima tu knjigu");
      }
    });
  }

  deleteBookFromUser() {
    let data = {
      id: this.barCode,
      userId: this.userId,
    };

    let headers = new Headers();
    headers.append("authorization", this.cookie);
    headers.append("Content-Type", "application/json");

    data = JSON.stringify(data);

    fetch(this.apiUrl + "/user/removeBook", {
      method: "put",
      headers: headers,
      body: data,
    }).then((response) => {
      if (response.status === 201) {
        location.reload();
      }
    });
  }
}
