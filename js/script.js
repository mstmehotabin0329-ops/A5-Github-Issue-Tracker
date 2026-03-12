const loadingSpinner = document.getElementById("loading-spinner");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const countProjectIssue = document.getElementById("countProjectIssue");
const cardContainer = document.getElementById("card-container");

let totalIssues = [];


async function toggleStyle(id) {
    const btns = [allBtn, openBtn, closedBtn];
    btns.forEach(btn => {
        btn.classList.remove("btn-primary", "text-white");
        btn.classList.add("btn-active");
    });

    const activeBtn = document.getElementById(id);
    activeBtn.classList.remove("btn-active");
    activeBtn.classList.add("btn-primary", "text-white");

    if (id === "all-btn") {
        showloading();
        loadDisplay(totalIssues);
        countProjectIssue.innerText = totalIssues.length;
        hideloading();
    } else if (id === "open-btn") {
        showloading();
        const openData = totalIssues.filter(issue => issue.status === "open");
        countProjectIssue.innerText = openData.length;
        loadDisplay(openData);
        hideloading();
    } else if (id === "closed-btn") {
        showloading();
        const closedData = totalIssues.filter(issue => issue.status === "closed");
        countProjectIssue.innerText = closedData.length;
        loadDisplay(closedData);
        hideloading();
    }
}


const searchBtn = document.getElementById("search-btn")
searchBtn.addEventListener('click', async () => {
    const searchText = document.getElementById("search-input").value.toLowerCase();
    if (searchText.length > 0) {
        showloading();

        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
        const data = await res.json();

        loadDisplay(data.data);
        countProjectIssue.innerText = data.data.length;
        hideloading();
    } else {
        loadIssue();
    }
});


function showloading() {
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');
}

function hideloading() {
    loadingSpinner.classList.add('hidden');
    loadingSpinner.classList.remove('flex');
}


async function loadIssue() {
    showloading();
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        totalIssues = data.data;
        countProjectIssue.innerText = totalIssues.length;
        loadDisplay(totalIssues);
    } catch (error) {
        console.error("Error fetching issues:", error);
    }
    hideloading();
}
loadIssue();


function loadDisplay(issues) {
    cardContainer.innerHTML = "";
    issues.forEach(issue => {
        const createElement = document.createElement('div');

        const borderClass = issue.status === "open" ? "border-t-4 border-green-500" : "border-t-4 border-purple-500";
        const logo = issue.status === "open" ? " assets/Open-Status.png" : " assets/Closed- Status .png"

        let labelItems = "";
        issue.labels.forEach(label => {
            labelItems += `<div class="badge badge-warning mr-2">${label}</div>`;
        });

        createElement.innerHTML = `
            <div onclick="issuesCardModal('${issue.id}')" class="card bg-base-100 shadow-xl cursor-pointer ${borderClass}">
                <div class="card-body">
                    <div class="h-40 w-full">
                        <div class="flex justify-between items-start">
                            <img src="${logo}" alt="">
                            <div class="badge badge-error badge-outline uppercase text-xs">${issue.priority}</div>
                        </div>
                        <h2 class="card-title">${issue.title}</h2>
                        <p class="text-gray-500 line-clamp-2 text-sm">${issue.description}</p>
                        <div class="flex flex-wrap gap-1 mt-2">
                            ${labelItems}
                        </div>
                        <div class="divider my-1"></div>
                    </div>
                    <div class="flex justify-between items-center text-xs text-gray-400">
                        <div>
                            <p>Author: <span class="font-medium text-gray-600">${issue.author}</span></p>
                            <p>Assignee: <span class="font-medium text-gray-600">${issue.assignee}</span></p>
                        </div>
                        <div class="text-right">
                            <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(createElement);
    });
}

async function issuesCardModal(id) {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const issue = data.data;


    const modalBox = document.getElementById('Issue-modal');
    let labelItems = "";
    issue.labels.forEach(label => {
        labelItems += `<div class="badge badge-warning mr-2">${label}</div>`;
    });
    modalBox.innerHTML = `
        <div class="modal-box">
            <h3 class="font-bold text-lg">${issue.title}</h3>
            <div class="flex gap-2 my-2">
                <span class="badge ${issue.status === 'open' ? 'badge-success' : 'badge-secondary'} capitalize">${issue.status}</span>
                <span class="text-gray-400">• Created by ${issue.author}</span>
            </div>
            <div class="flex flex-wrap gap-1 mt-4">
                ${labelItems}
            </div>
            <p class="py-4 text-gray-600">${issue.description}</p>
            <div class="bg-gray-100 p-4 rounded-lg flex justify-between">
                <div>
                    <p class="text-sm font-semibold">Assignee</p>
                    <p>${issue.assignee}</p>
                </div>
                <div>
                    <p class="text-sm font-semibold">Priority</p>
                    <span class="badge badge-error text-white">${issue.priority}</span>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-primary">Close</button>
                </form>
            </div>
        </div>
    `;
    modalBox.showModal();
}
