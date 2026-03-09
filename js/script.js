const loadingSpinner = document.getElementById("loading-spinner");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const countProjectIssue = document.getElementById("countProjectIssue");

let totalIssues = [];




async function loadIssue() {
    showloading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    totalIssues = data.data
    countProjectIssue.innerText = totalIssues.length;
    hideloading();
    loadDisplay(totalIssues);

}
function loadDisplay(issues) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    issues.forEach(issue => {
        // console.log(issue);
        let labelItems = "";
        issue.labels.forEach(label => {
            labelItems += `<div class="badge badge-warning">${label}</div>`

        })
        const border = issue.status === "open" ? " border-t-2 border-green-500" : " border-t-2 border-purple-500"
        const logo = issue.status === "open" ? " assets/Open-Status.png" : " assets/Closed- Status .png"


        const issueCard = `<div class="bg-base-100 card-md shadow-sm rounded-lg ${border} onclick="renderCard(${issue.id})"">
                <div class="card-body h-60 w-full object-cover">
                    <div class="flex justify-between">
                        <img src="${logo}" alt="">
                            <div class="badge badge-soft badge-error rounded-full uppercase">${issue.priority}</div>
                    </div>
                    <h2 class="card-title">${issue.title}</h2>
                    <p class="text-gray-500 line-clamp-2 mb-2">${issue.description}
                    </p>
                    <div class = "flex gap-3 uppercase mb-3">
                    ${labelItems}
                    </div>
                    

                </div>
                <hr class="border-gray-500 ">
                    <div class="gray mt-3 p-6">
                        <p>${issue.priority}</p>
                        <p>${issue.assignee}</p>
                    </div>
            </div>
        `;
        cardContainer.innerHTML += issueCard;
    });


}
loadIssue();