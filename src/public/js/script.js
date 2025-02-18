document.addEventListener("DOMContentLoaded", function () {
  let selectedSkills = [];

  document.querySelectorAll(".skill").forEach((item) => {
    item.addEventListener("click", function () {
      let skill = this.textContent;

      //  if not any skills before selecting any skill
      if (!selectedSkills.includes(skill)) {
        selectedSkills.push(skill);
        document.getElementById("selectedSkills").value =
          selectedSkills.join(", ");
      }
    });
  });
});
