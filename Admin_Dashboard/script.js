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

        let percentage = (member.visitsRemaining / 30) * 100;

        list.innerHTML += `
            <div class="member-card">
                <h3>${member.name}</h3>
                <p>Visits Remaining: ${member.visitsRemaining}/30</p>
                <div class="progress">
                    <div class="progress-bar" style="width:${percentage}%"></div>
                </div>
                <p>Status: ${member.isActive ? "🟢 Active" : "🔴 Expired"}</p>
            </div>
        `;
    });

    document.getElementById("activeCount").innerText = activeCount;
    document.getElementById("revenue").innerText = revenue;
}
