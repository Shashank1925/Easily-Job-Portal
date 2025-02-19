document.addEventListener("DOMContentLoaded", function() {
  console.log("JavaScript Loaded!"); // Debugging

  let selectedSkills = [];
  let selectedSkillsContainer = document.getElementById('selectedSkillsContainer');

  document.querySelectorAll('.skill').forEach(item => {
      console.log("Skill found:", item.textContent); // Debugging

      item.addEventListener('click', function() {
          console.log("Clicked on:", this.textContent); // Debugging
          let skill = this.textContent.trim();
          this.classList.toggle("selected");

          if (this.classList.contains("selected")) {
              selectedSkills.push(skill);
          } else {
              selectedSkills = selectedSkills.filter(s => s !== skill);
          }

          document.getElementById('selectedSkills').value = selectedSkills.join(', ');
          updateSelectedSkillsUI();
      });
  });

  function updateSelectedSkillsUI() {
      selectedSkillsContainer.innerHTML = "";
      selectedSkills.forEach(skill => {
          let skillBadge = document.createElement("span");
          skillBadge.classList.add("badge", "bg-success", "m-1", "p-2");
          skillBadge.textContent = skill;
          selectedSkillsContainer.appendChild(skillBadge);
      });
  }
});
