/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Biswas KC",
      username: "kcBisse",
      password: "Terobau",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.contains("username");
    cy.contains("password");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("kcBisse");
      cy.get("#password").type("Terobau");
      cy.get("#login-button").click();
      cy.contains("Biswas KC logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "kcBisse", password: "Terobau" });
    });
    it("A blog can be created", function () {
      cy.contains("create blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Biswas ji");
      cy.get("#url").type("www.bthe.com");
      cy.contains("save").click();
      cy.contains("a blog created by cypress");
    });
    describe("and a blog exists", function () {
      describe("and several blogs exist", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "100 dys of summer",
            author: "summer",
            url: "www.summerdays.com",
          });
          cy.createBlog({
            title: "200 dys of summer",
            author: "summer singh",
            url: "www.summerdays.com",
          });
          cy.createBlog({
            title: "400 dys of summer",
            author: "summer chauhan",
            url: "www.summerdays.com",
          });
        });
        it("A blog can be created", function () {
          cy.contains("400 dys of summer");
        });
        it("one of those can be made important", function () {
          cy.contains("200 dys of summer")
            .parent()
            .find("#likeButton")
            .as("thebutton");
          cy.get("@theButton").click();
          cy.get("@theButton").should("contain", "like");
          cy.contains("1 likes");
        });
      });
    });
  });
});
