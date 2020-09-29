// Function to change the image of the *recommender* on the home page
// Creating sideshow for the reccomenders of the platform.
let iterator = 0;

// Images list containing image file paths that would be used for our slide show
let images_list = ['Images/patient.png', 'Images/patient.png.jpg'];
let names_list = ['Patient1', 'Patient2']
let desc_list = ['I have been cured by doctors at King Faisal','I have been treated of cancer from King Faisal']
let img_element = document.querySelector(".reccomendation img");

let name_element = document.querySelector(".reccomendation h2");
console.log(name_element);

let desc_element = document.querySelector(".reccomendation p");

// Sideshow function that changes the banner image source once called
function slide_show() {
    // Set img src to the value of the image at iterator.
    img_element.src = images_list[iterator];
    name_element.innerHTML = names_list[iterator];
    desc_element.innerHTML = desc_list[iterator];

    // Update iterator
    if (iterator < images_list.length - 1){
        iterator++;
    } else {
        iterator = 0;
    }

    // Call function once time is due.
    setTimeout("slide_show()", time);
}

// Question and answer variables containing the questions and answers_quiz1 for the first quiz.
let answers_quiz1  = ["a", "b", "c", "d", "a", "b"];
let question_arr_Q1 = ["question1", "question2", "question3", "question4", "question5", "question6"];

// List containing the id's of the images to be displayed when a question is answered.
let mark_img = ["img1", "img2", "img3", "img4", "img5", "img6"];

// Function to check responses in the first quiz
function check_response() {
    //Count to keep track of the number of correct choices
    let count = 0;

    // Check if all values have been ticked
    for (let j = 0; j < question_arr_Q1.length; j++) {
    	let curr_question = question_arr_Q1[j];
    	// Variable to get the checked box in the current value
        let curr_question_val = document.querySelector('input[name="'+curr_question+'"]:checked');
    	if (curr_question_val == null){
            alert("Please answer all questions before submission");
            return;
        }
    }

    // Loop going through the checked value per question, to check if the chosen value is the same as the answer
    for (let i = 0; i < question_arr_Q1.length ; i++) {
        // Variable to store the current question
        let curr_question = question_arr_Q1[i];

        // Variable to get the checked box in the current value
        let curr_question_val = document.querySelector('input[name="'+curr_question+'"]:checked');

        // Question mark img
        let Q_img = document.getElementById(mark_img[i]);

        // Increase count if all questions have been checked and the checked value is correct
        if (curr_question_val.value === answers_quiz1[i]){
            count++;
            Q_img.src = "Images/tick.png";
        }
        // Make the images visible
        Q_img.style.display = "block";
    }

    // Display the result of the quiz
    display_result(count);

    // Styling for the button after a submission has been made.
    document.getElementById("button").disabled = true;
    document.getElementById("button").style.backgroundColor = "#c7c7c7";
}

// Function to update the results tab
function display_result(count){
	// After all questions have been answered, display the result box alongside the appropriate message
    let result_tab = document.querySelector(".result");
    result_tab.style.display = "block";

    // Variables to store the result of the test i.e the score, percentage and message.
    document.getElementById("score").innerHTML = "Score: " +  count + "/6";
    document.getElementById("percentage").innerHTML ="Percentage: " + (100 * (count/6)).toFixed()+"%";
    let message_h4 = document.getElementById("message");
    if (count === 6){
        message_h4.innerHTML = "Message: What a rockstar!"
    }
    else if (2 < count && count < 6) {
        message_h4.innerHTML = "Message: You're almost there keep trying!"
    }
    else {
        message_h4.innerHTML = "Message: Better go and read. 😂😂";
    }
}

// Dictionary containing the answers in quiz2
question_answer = {
	Q1 : ["a", "question1", "Control structures determine which statements in the program will be executed and in what order, allowing for statements to be skipped over or executed repeatedly. if, if/else, and if/elif/else statements are all examples of control structures that allow for statements to be skipped over or executed conditionally"],
	Q2 : ["b", "question2", "No specific token denotes the end of a block in Python. In Python, blocks are defined by indentation in accordance with the off-side rule. When a statement occurs on a line which is indented less than the previous one, it indicates the end of a block."],
	Q3 : ["c", "question3", "Unfortunately, none of our facilitators coined the word recursion."],
	Q4 : ["d", "question4", "According to global standards, HTML can be defined as an hyper text markup language."],
	Q5 : ["a", "question5", "The full meaning of CSS is Cascading style sheet."],
	Q6 : ["b", "question6", "Sorry that was the wrong option. The correct option is Object Oriented programming."]
};

// Variables to keep track of the number of questions answered correctly and the total number of questions answered.
let Q_2_ans = 0;
let correct_ans = 0;

// Function to check responses for the second quiz
function check_response2(name){

	// Current question 
	let curr_question = question_answer[name][1];

	// Selected answer for the current question
    let curr_question_val = document.querySelector('input[name="'+curr_question+'"]:checked');

    // Get Question mark image i.e tick and cancel images respectively
    let Q_img = document.querySelector("#"+name+ " img");

    // alert(curr_question);
    // Check if the question has been anwered
    if (curr_question_val == null){
        alert("Fucking😒😒 answer all questions Idiot");
        return;
    }

    // Check if the answer is correct.
    else if(curr_question_val.value === question_answer[name][0]){
        generate_correct(name);
        Q_img.src = "Images/tick.png";
        correct_ans++;
    }

    // Check if the answer is incorrect and display the neccesary feedback.
    else if(curr_question_val.value !== question_answer[name][0]){
        generate_wrong(name, question_answer);
    }

    // Increase the number of questions answered
    Q_2_ans++;

    // Display the question tick
    Q_img.style.display = "block";

    // Disable the submit button
    document.querySelector("#" + name + " .button2").disabled = true;
    document.querySelector("#" + name + " .button2").style.backgroundColor = "#c7c7c7";

    // Display the result tab if all questions have been answered.
    if (Q_2_ans === 6) {
    	display_result(correct_ans);
    }
}

// Function to generate feedback when the given answer is correct
function generate_correct(name) {
    let para = document.createElement("P");
    let t = document.createTextNode("You got it right! :)");
    para.appendChild(t);
    para.style.color = "#30c741";
    document.getElementById(name).appendChild(para);
}

// Function to generate feedback when the given answer is wrong
function generate_wrong(name, question_answer) {
    let para = document.createElement("P");
    let t = document.createTextNode(question_answer[name][2]);
    para.appendChild(t);
    para.style.color = "#c73a26";
    document.getElementById(name).appendChild(para);
}

// Generate slider output for quiz 3
function updateTextInput(val) {
    document.getElementById('textInput').value = "Slider value: " + val;
}

// Dictionary containing the answers in quiz3
question_answer2 = {
	Q1 : ["2", "number_picker", "ALU Rwanda is just two years old"],
	Q2 : ["volvo", "dropdown", "Sorry, volvo is the only car brand in the list."],
	Q3 : ["Slider value: 29", "textInput", "Sorry that was the wrong option. More like 29 degrees today."],
	Q4 : ["Emelyne", "text_question", "The name of your facilitator is Emelyne!!!!"],
	Q5 : [["a", "b"], "question5", "Missed that sorry! Options a and b are the correct options"],
	Q6 : [["c", "d"], "question6", "Missed that sorry! Options c and d are the correct options"]
};

// Variables to keep track of the number of questions answered correctly and the total number of questions answered.
let Q_2_ans2 = 0;
let correct_ans2 = 0;

// Function to check responses for the third quiz.
function check_response3(id_val){
    // Get Question mark image i.e tick and cancel images respectively
    let Q_img = document.querySelector("#"+id_val+ " img");

    // Logic to check questions 1 to question 4.
	if (id_val === "Q1" || id_val === "Q2" || id_val === "Q3" || id_val === "Q4") {
	    // Get response value
	    let response = document.getElementById(question_answer2[id_val][1]);
	    console.log(response.value);

	    // Check if response is not blank
        if (response.value === ""){
            alert("Fill in the answer before submitting");
            return;
        }

        // Check if answer is correct
        else if (response.value === question_answer2[id_val][0]){
            generate_correct(id_val);
            Q_img.src = "Images/tick.png";
            correct_ans2++;
        }

        // Check if answer is wrong and generate feedback
        else if (response.value !== question_answer2[id_val][0]){
            generate_wrong(id_val, question_answer2);
        }
	}

	// Logic to check question 5 and 6
    else if (id_val === 'Q5' || id_val === 'Q6') {
        // Get input tag
        let curr_question = question_answer2[id_val][1];

        // Get all the checked values in that question
        let curr_question_val = document.querySelectorAll('input[name="'+curr_question+'"]:checked');

        // Check if the value is not blank
        if (curr_question_val[0] == null){
            alert("Fill in the answer before submitting");
            return;
        }

        // Check if the correct answers were provided
        else{
            // Check if the number of selected answers is equal to the number of actual answers
            if (curr_question_val.length === question_answer2[id_val][0].length) {
                for (let i = 0; i < curr_question_val.length ; i++) {

                    // Check if there is a wrong answer in the selected answers
                    if (curr_question_val[i].value !== question_answer2[id_val][0][i]){
                        // Generate feedback for incorrect response
                        generate_wrong(id_val, question_answer2);
                        // return;
                    }

                }
                // Generate feedback for correct response
                generate_correct(id_val);
                Q_img.src = "Images/tick.png";
                correct_ans2++;
            }

            // Generate feedback for incorrect responses
            else {
                generate_wrong(id_val, question_answer2)
            }

        }
    }
    // Increase the number of questions answered
    Q_2_ans2++;

    // Disable the submit button
    document.querySelector("#" + id_val + " .button2").disabled = true;
    document.querySelector("#" + id_val + " .button2").style.backgroundColor = "#c7c7c7";

    // Display image if correct or wrong
    Q_img.style.display = "block";

    // Display the result tab if all questions have been answered.
    if (Q_2_ans2 === 6) {
        display_result(correct_ans2);
    }
}

// Function to validate input in the contact page form
function validate_text() {
    console.log("I am calling this function");
    // Gets value of name input and stores it in the text_input variable
    let text_input = document.getElementById("f_name").value;

    // Removes spaces from the text input to aid the validation process
    text_input = text_input.split(" ").join("");

    // Gets value of email input and stores it in the email_input variable
    let email_input = document.getElementById("e_name").value;

    // Logic to validate that neither the name box not the email address box is left blank
    if (text_input.trim() === "" || email_input.trim() === "") {
        alert("Blank values are not allowed for the Name and email categories");
        return false;
    }

    // Logic to validate that text entered in the name segment is part of the valid set as described in the assignment.
    let valid_text = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-']);
    for (let i = 0; i < text_input.length ; i++){
        if (!valid_text.has(text_input[i].toLowerCase())){
            alert("Name box only accepts valid english alphabets and hyphens");
            return false;
        }
    }

    // Logic to validate that email structure is standard and not invalid
    let valid_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!valid_email.test(String(email_input).toLowerCase())){
        alert("Email address is not valid. Please enter a valid address");
        return false;
    }
    alert("Thank you for your inquiry! You would be contacted within the next three days.");
    return true;
}