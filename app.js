// app.js

// 检查浏览器是否支持 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}




const addDestinationButton = document.getElementById('add-destination');
const destinationList = document.getElementById('destination-list');
let destinations = JSON.parse(localStorage.getItem('destinations')) || [];

// 获取模态框和按钮
const modal = document.getElementById('confirmation-modal');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');
let deleteIndex = null; // 用于记录将要删除的目的地索引

const addModal = document.getElementById('add-destination-modal'); // 新增目的地输入模态框
const confirmAddButton = document.getElementById('confirm-add');
const cancelAddButton = document.getElementById('cancel-add');
const inputDestinationName = document.getElementById('destination-name-input'); // 输入框

function renderDestinations() {
    destinationList.innerHTML = ''; // 清空当前列表
    destinations.forEach((destination, index) => {
        const li = document.createElement('li');
        
        // 更新列表项显示目的地名称和删除按钮
        li.innerHTML = `
            <span class="destination-name">${destination.name}</span>
            <button class="delete-btn" onclick="prepareDelete(event, ${index})">🗑️</button>
        `;
        
        // 点击目的地跳转到相应的天数页面
        li.addEventListener('click', () => {
            window.location.href = `day.html?destination=${index}`;
        });
        
        destinationList.appendChild(li);
    });
}

function prepareDelete(event, index) {
    event.stopPropagation(); // 阻止事件冒泡，防止触发页面跳转
    
    deleteIndex = index; // 记录要删除的目的地索引
    modal.style.display = 'flex'; // 显示模态框
}

function deleteDestination() {
    destinations.splice(deleteIndex, 1);  // 删除目的地
    localStorage.setItem('destinations', JSON.stringify(destinations));  // 保存更新后的数据
    renderDestinations();  // 重新渲染目的地列表
    modal.style.display = 'none'; // 关闭模态框
}

addDestinationButton.addEventListener('click', () => {
    addModal.style.display = 'flex'; // 显示新增目的地输入模态框
});

confirmAddButton.addEventListener('click', () => {
    const name = inputDestinationName.value.trim();
    if (name) {
        destinations.push({ name, days: [] });  // 新增目的地
        localStorage.setItem('destinations', JSON.stringify(destinations));  // 保存数据
        renderDestinations();  // 重新渲染目的地列表
        addModal.style.display = 'none'; // 关闭新增目的地模态框
        inputDestinationName.value = ''; // 清空输入框
    }
});

cancelAddButton.addEventListener('click', () => {
    addModal.style.display = 'none'; // 关闭新增目的地模态框
    inputDestinationName.value = ''; // 清空输入框
});

confirmDeleteButton.addEventListener('click', deleteDestination);
cancelDeleteButton.addEventListener('click', () => {
    modal.style.display = 'none'; // 关闭模态框
});

renderDestinations();  // 初始化页面时渲染目的地列表
