// 获取 URL 参数
const urlParams = new URLSearchParams(window.location.search);
const destinationIndex = urlParams.get('destination');
const dayIndex = urlParams.get('day');

// 获取 DOM 元素
const activityList = document.getElementById('activity-list');
const addActivityButton = document.getElementById('add-activity');

// 获取目的地数据
let destinations = JSON.parse(localStorage.getItem('destinations'));
const destination = destinations[destinationIndex];
const day = destination.days[dayIndex];

// 渲染活动列表
function renderActivities() {
    activityList.innerHTML = ''; // 清空活动列表

    day.activities.forEach((activity, index) => {
        const li = document.createElement('li');
        li.textContent = activity.text || `未命名活动 ${index + 1}`; // 如果没有名称，显示默认名称

        // 创建删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // 阻止点击删除按钮时触发 li 的点击事件
            deleteActivity(index); // 删除活动
        });

        // 添加删除按钮到活动项
        li.appendChild(deleteButton);

        li.addEventListener('click', () => {
            window.location.href = `activity-detail.html?destination=${destinationIndex}&day=${dayIndex}&activity=${index}`;
        });
        activityList.appendChild(li);
    });
}

// 删除活动
function deleteActivity(index) {
    // 显示删除确认弹窗
    showDeleteModal();
    // 设置当前要删除的活动索引
    deleteIndex = index;
}

// 显示删除确认弹窗
function showDeleteModal() {
    const modal = document.getElementById('delete-modal');
    modal.style.display = 'flex'; // 显示弹窗
}

// 隐藏弹窗
function hideDeleteModal() {
    const modal = document.getElementById('delete-modal');
    modal.style.display = 'none'; // 隐藏弹窗
}

// 确认删除
document.getElementById('confirm-delete').addEventListener('click', () => {
    day.activities.splice(deleteIndex, 1); // 删除指定的活动
    localStorage.setItem('destinations', JSON.stringify(destinations));
    renderActivities(); // 更新活动列表
    hideDeleteModal(); // 删除后隐藏弹窗
});

// 取消删除
document.getElementById('cancel-delete').addEventListener('click', () => {
    hideDeleteModal(); // 取消后隐藏弹窗
});


// 点击“添加新活动”按钮，跳转到创建活动的页面
addActivityButton.addEventListener('click', () => {
    const newActivity = { text: 'NEW', description: '', image: '' };
    day.activities.push(newActivity);
    localStorage.setItem('destinations', JSON.stringify(destinations));
    renderActivities(); // 更新活动列表
});

// 初始化页面时渲染活动列表
renderActivities();
