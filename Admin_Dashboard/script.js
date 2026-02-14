const API = "http://localhost:5000";

async function loadMembers(){
    const res = await fetch(`${API}/members`);
    const data = await res.json();

    const list = document.getElementById("memberList");
    list.innerHTML = "";

    let activeCount = 0;
    let revenue = 0;

    data.forEach(member => {

        if(member.isActive) activeCount++;
        revenue += member.paymentAmount;

        list.innerHTML += `
            <div class="card">
                <h3>${member.name}</h3>
                <p>Visits Remaining: ${member.visitsRemaining}</p>
                <p>Status: ${member.isActive ? "Active" : "Expired"}</p>
            </div>
        `;
    });

    document.getElementById("activeCount").innerText = activeCount;
    document.getElementById("revenue").innerText = revenue;
}

async function addMember(){
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const payment = document.getElementById("payment").value;

    await fetch(`${API}/add-member`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({name,email,paymentAmount:payment})
    });

    closeModal();
    loadMembers();
}

function openModal(){
    document.getElementById("modal").style.display="block";
}

function closeModal(){
    document.getElementById("modal").style.display="none";
}

function exportCSV(){
    window.open(`${API}/members`);
}

loadMembers();
