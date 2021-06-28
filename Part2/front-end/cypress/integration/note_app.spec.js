/* eslint-disable no-undef */
describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      username: "KcBisse",
      name: "Biswas KC",
      password: "Terobau",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
  });

  it("user can login with good credentials", function () {
    cy.contains("log in").click();
    cy.get("#username").type("KcBisse");
    cy.get("#password").type("Terobau");
    cy.get("#login-button").click();

    cy.contains("Biswas KC logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("log in").click();
    cy.get("#username").type("KcBisse");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "KcBisse", password: "Terobau" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      describe("and several notes exist", function () {
        beforeEach(function () {
          cy.createNote({ content: "first note", important: false });
          cy.createNote({ content: "second note", important: false });
          cy.createNote({ content: "third note", important: false });
        });

        it("one of those can be made important", function () {
          cy.contains("second note").parent().find("button").as("theButton");
          cy.get("@theButton").click();
          cy.get("@theButton").should("contain", "make not important");
        });
      });
    });
  });
});
