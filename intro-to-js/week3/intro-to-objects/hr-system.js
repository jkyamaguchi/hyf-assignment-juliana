// CVs we need to process
const cvs = [];
// Potential candidate that will apply;
const john = {
  firstname: 'John',
  lastname: 'Doe',
  skills: ['JS', 'HTML', 'CSS']
};
const jane = {
  firstname: 'Jane',
  lastname: 'Doe',
  skills: ['JS', 'HTML']
};
const jimmy = {
  firstname: 'Jimmy',
  lastname: 'Mitchel',
  skills: ['Baking', 'Cooking', 'Dancing']
};
const hannah = {
  firstname: 'Hannah',
  lastname: 'Montana',
  skills: ['JS', 'React.JS', 'Next.JS', 'C++', 'Python']
};

function candidateApplies(candidate) {
  // Add the candidate to the list of CVs
  cvs.push(candidate);
}

function processFirstCandidate() {
  // Takes the first candidate in the list
  const candidate = cvs[0];
  
  // Console log their skills
  console.log("Skills: ", candidate.skills);  

  // Removes the candidate from the list of CVs to process
  cvs.shift(); //access and removes from beginning
}

function printCandidates(cvs){
  console.log("=== CANDIDATES ===");
  for (let i = 0; i < cvs.length; i++){
    console.log(cvs[i].firstname);  
  }
  console.log("==================");
}

candidateApplies(john);
printCandidates(cvs);

candidateApplies(jane);
printCandidates(cvs);

candidateApplies(jimmy);
printCandidates(cvs);

candidateApplies(hannah);
printCandidates(cvs);

processFirstCandidate();
// processFirstCandidate();
// processFirstCandidate();
// processFirstCandidate();


function referCandidate(candidate) {
  // Adds the candidate at the beginning of the list of CVs
  cvs.unshift(candidate);
}

function isCandidateValid(candidate) {
  // Given a candidate, return true if the candidate's skills includes 'JS'
  // Check on the Internet how the function .includes() works.
  return candidate.skills.includes('JS');
}

function isJCandidate(candidate) {
  // [BONUS] Given a candidate, return true if the candidate's firstname starts with 'J'
  return candidate.firstname[0].toLowerCase() === "j";
}

referCandidate(hannah);
printCandidates(cvs);


console.log("Is candidate valide?", isCandidateValid(hannah));

console.log("Is candidate J?", isJCandidate(hannah));


