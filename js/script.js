const loadingSpinner = document.getElementById("loading-spinner");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const countProjectIssue = document.getElementById("countProjectIssue");

let totalIssues = [];

async function toggleStyle(id) {
    // console.log(id, btns);

    showloading();
    const btns = [allBtn, openBtn, closedBtn];
    btns.forEach(btn => {
        btn.classList.remove("btn-primary", "text-white");
        btn.classList.add("btn-active");

    });

    const activeBtn = document.getElementById(id);
    activeBtn.classList.remove("btn-active");
    activeBtn.classList.add("btn-primary", "text-white");
    hideloading();

    if (id === "all-btn") {

        loadIssue();
    }
    else if (id === "open-btn") {
        loadOpenIssues();
    }
    else if (id === "closed-btn") {
        loadClosedIssues();
    }

}
// loading spinner add
function showloading() {
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');
}
function hideloading() {
    loadingSpinner.classList.add('hidden');
}



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

async function loadOpenIssues() {
    showloading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const openData = data.data.filter(issue => issue.status === "open");
    countProjectIssue.innerText = openData.length;
    hideloading();
    loadDisplay(openData);


}
async function loadClosedIssues() {
    showloading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const closedData = data.data.filter(issue => issue.status === "closed");
    countProjectIssue.innerText = closedData.length;
    hideloading();
    loadDisplay(closedData);

}



loadIssue();