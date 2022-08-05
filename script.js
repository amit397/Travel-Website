console.log("balls");

//Setting up quiz questions and how they are going to be called
class QuizOption {
  constructor(title, imgUrl) {
    this.title = title;
    this.imgUrl = imgUrl;
  }
}

class Quiz {
  constructor(id, question, options) {
    this.id = id;
    this.question = question;
    this.options = options;
  }
}

let quizQuestions = [
  new Quiz("color",
    "Pick a favorite color.",
    [new QuizOption("Blue", "https://media.architecturaldigest.com/photos/5ba551bb44966b64d8d5fc2b/4:3/w_3868,h_2901,c_limit/hyper-blue-4.jpg"),
    new QuizOption("Orange", "https://healthyfamilyproject.com/wp-content/uploads/2020/05/Oranges-background.jpg"),
    new QuizOption("Brown", "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlJTIwYmVhbnxlbnwwfHwwfHw%3D&w=1000&q=80"),
    new QuizOption("Red", "https://76crb34usu-flywheel.netdna-ssl.com/wp-content/uploads/2016/12/tomatoes_Things_that_are_red.jpg")]),

  new Quiz("vacation",
    "Pick a favorite vacation spot.",
    [new QuizOption("Alaska", "https://www.alaskanatureguides.com/images/denali_1.jpg"),
    new QuizOption("Space",
      "https://www.areyouready.tv/wp-content/uploads/2020/06/Man-on-the-moon-702x459-1.jpg"),
    new QuizOption("New Orleans", "https://i.pinimg.com/originals/47/73/44/477344c852a37407bd11e367ce9a2d1e.jpg"),
    new QuizOption("Staycation", "https://homedesignlover.com/wp-content/uploads/2012/03/2-ladies-minimal.jpg")]),
  new Quiz("pizza",
    "Pick a favorite pizza.",
    [new QuizOption("Margherita", "https://img.sunset02.com/sites/default/files/styles/marquee_large_2x/public/image/recipes/su/10/02/pizzetta-margherita-pizza-su-x.jpg"),
    new QuizOption("Veggie",
      "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Grilled-Veggie-Pizza_EXPS_LSBZ18_48960_D01_18_6b.jpg"),
    new QuizOption("Pineapple", "https://d332juqdd9b8hn.cloudfront.net/wp-content/uploads/2019/07/GettyImages-487260560.jpg"),
    new QuizOption("Plain", "https://yeadonpizza.com/wp-content/uploads/2020/08/plain-pizza.jpg")]),
  new Quiz("house",
    "Pick a dream house.",
    [new QuizOption("Farm House", "https://nationalmortgageprofessional.com/sites/default/files/2015-04/ThinkstockPhotos-176836910_0.jpg"),
    new QuizOption("City Apartment",
      "https://empire-s3-production.bobvila.com/slides/35863/vertical_slide_wide/tiny_new_york_apartments.jpg?1581523935"),
    new QuizOption("Suburban House", "https://architecturesstyle.com/wp-content/uploads/2021/01/suburban-house-ideas-9.jpeg"),
    new QuizOption("Mansion", "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_16/3466983/210422-florida-wedding-mb-1802.jpg")]),
]

//setting up what each option means in the quiz
let quiz = {
  color: ["logical", "creative", "logical", "creative"],
  vacation: ["extrovert", "introvert", "extrovert", "introvert"],
  pizza: ["creative", "logical", "creative", "logical"],
  house: ["introvert", "extrovert", "introvert", "extrovert"],
};

//setting up initial values of the quiz
let quizTaker = {
  logical: 0,
  creative: 0,
  extrovert: 0,
  introvert: 0,
};

let finA1 = document.getElementById("logical-introvert")
let finA2 = document.getElementById("logical-extrovert")
let finA3 = document.getElementById("creative-introvert")
let finA4 = document.getElementById("creative-extrovert")

//setting up where the quiz will be written
let quizBodyHTML = document.querySelector("#quiz");
const takeAgain = document.querySelector("#button1")


//making the HTML for the quiz and pasting it into where the quiz will be 
for (let questionSection of quizQuestions) {
  // quizContent is the content you are adding to your innerHTML, you have to store it as a string first before adding it to innerHTML
  let quizContent = ""

  // Adding start html tags
  let quizHTMLStart = `<section class="section">
        <h1 class="title">${questionSection.question}</h1>
        <!-- Answer Choices -->
        <div class="container">
          <div class="columns">`
  quizContent += quizHTMLStart

  let quizIndex = 0;
  for (let quizOption of questionSection.options) {
    // Adding option html tags
    let optionHTML = `<!-- ${quizOption.title} -->
            <div class="column has-text-centered">
              <figure
                id="${questionSection.id}-${quizIndex}"
                class="card-image card notification has-background-light is-inline-block"
              >
                <div class="container">
                  <img
                    src="${quizOption.imgUrl}"
                    alt="${quizOption.title}"
                  />
                </div>
                <div class="subtitle">${quizOption.title}</div>
              </figure>
            </div>`;
    quizContent += optionHTML;
    quizIndex++;
  }

  // Adding html end tags
  let quizHTMLEnd = `</div></div></section>`
  quizContent += quizHTMLEnd

  // add entire quizContent to the quizBody.innerHTML
  quizBodyHTML.innerHTML += quizContent

  //code turning on light for the cards
  let pictures = document.querySelectorAll(".card-image");

  console.log(pictures)
  pictures.forEach((picture) => {
    picture.addEventListener("click", (e) => {
      let choice = picture.id.split("-");
      console.log(choice);

      picture.classList.toggle("has-background-light");
      picture.classList.toggle("has-background-warning");

      let answer = quiz[choice[0]][choice[1]];
      quizTaker[answer]++;

      // Changed this such that it checks for whatever the last quiz choice is
      let lastQuizChoice = quizQuestions[quizQuestions.length - 1].id
      if (choice[0] === lastQuizChoice) {
        let resultID;

        if (quizTaker.logical > quizTaker.creative) {
          resultID = "#logical-";
        } else {
          resultID = "#creative-";
        }

        if (quizTaker.introvert > quizTaker.extrovert) {
          resultID += "introvert";
        } else {
          resultID += "extrovert";
        }

        let result = document.querySelector(resultID);
        console.log(result);
        result.classList.remove("hidden");
      }
    });
  });
}






let params = new URLSearchParams({
  access_key: "fced9f9f5b9c4cfd40506d87995e8c22",
  limit: 10
})

//test
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch(`http://api.aviationstack.com/v1/flights?access_key=fced9f9f5b9c4cfd40506d87995e8c22`)
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      header.textContent = user.name
      body.textContent = user.email
      userCardContainer.append(card)
      return { name: user.name, email: user.email, element: card }
    })
  })


// Flight Stuff
//const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", (e) => {
  const value = e.target.value
  console.log(flighList)
})



let flighList = []
fetch(`http://api.aviationstack.com/v1/flights?${params}`)
  .then(res => res.json())
  .then(data => {
    flighList = data.map(user => {
      return {}
    })
  })


fetch(`http://api.aviationstack.com/v1/flights?access_key=fced9f9f5b9c4cfd40506d87995e8c22`)
  .then((response) => response.json())
  .then((data) => console.log(data))








