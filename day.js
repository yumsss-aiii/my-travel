document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const destinationIndex = urlParams.get('destination');

    // 获取 DOM 元素
    const destinationName = document.getElementById('destination-name');
    const addDayButton = document.getElementById('add-day');
    const dayList = document.getElementById('day-list');

    // 获取目的地数据
    let destinations = JSON.parse(localStorage.getItem('destinations')) || [];
    const destination = destinations[destinationIndex];

    // 确保目的地对象存在，并初始化 days 数组
    if (!destination.days) {
        destination.days = [];
    }

    // 显示目的地名称
    destinationName.textContent = destination.name;

// 获取弹窗元素
const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');


    // 渲染天数列表
    function renderDays() {
        dayList.innerHTML = ''; // 清空列表
        destination.days.forEach((day, index) => {
            const li = document.createElement('li');
            
            // 创建天数名称的输入框，允许自定义名称
            const dayNameInput = document.createElement('input');
            dayNameInput.type = 'text';
            dayNameInput.value = day.name || ''; // 允许用户自定义名字，默认为空
            dayNameInput.placeholder = `请输入第 ${index + 1} 天的名称`; // 给输入框加个占位符，提示用户输入名字
           dayNameInput.readOnly = true;

            dayNameInput.classList.add('day-name-input'); // 添加样式类
            
            // 创建删除按钮
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = '🗑️';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // 防止点击删除按钮时触发跳转
                deleteDay(index); // 删除按钮的点击事件
            });

            li.appendChild(dayNameInput); // 添加输入框到列表项
            li.appendChild(deleteButton); // 添加删除按钮到列表项

            // 添加点击事件，使其跳转到 detail 页面
            li.addEventListener('click', (e) => {
                if (!e.target.classList.contains('delete-btn') && !e.target.classList.contains('day-name-input')) {
                    // 如果点击的是删除按钮以外的地方，执行跳转
                    window.location.href = `detail.html?destination=${destinationIndex}&day=${index}`;
                }
            });

            dayList.appendChild(li); // 将列表项添加到列表中
        });

        // 更新 localStorage
        localStorage.setItem('destinations', JSON.stringify(destinations));
    }

    // 更新天数名称
    function updateDayName(index, newName) {
        destination.days[index].name = newName; // 更新目的地数据
        localStorage.setItem('destinations', JSON.stringify(destinations)); // 保存到 localStorage
        renderDays(); // 重新渲染列表
    }

    // 添加新天数
    addDayButton.addEventListener('click', () => {
       const modal = document.getElementById('add-day-modal');
       const input = document.getElementById('day-name-input');
       input.value = ''; // 清空输入框
       modal.style.display = 'flex'; // 显示弹窗
    });
// 监听确认添加按钮
document.getElementById('confirm-add-day').addEventListener('click', () => {
    const modal = document.getElementById('add-day-modal');
    const dayName = document.getElementById('day-name-input').value;

    if (dayName) {
        destination.days.push({ activities: [], name: dayName });
        localStorage.setItem('destinations', JSON.stringify(destinations)); // 加这行保存数据
        renderDays();
    }
    modal.style.display = 'none'; // 隐藏弹窗
});

// 监听取消按钮
document.getElementById('cancel-add-day').addEventListener('click', () => {
    document.getElementById('add-day-modal').style.display = 'none';
});

let deleteIndex = null; // 记录要删除的索引

    // 删除天数
    function deleteDay(index) {
        deleteIndex = index;
    document.getElementById('delete-modal').style.display = 'flex';
    }

// 监听确认删除按钮
document.getElementById('confirm-delete').addEventListener('click', () => {
    destination.days.splice(deleteIndex, 1);
    localStorage.setItem('destinations', JSON.stringify(destinations));
    renderDays();
    document.getElementById('delete-modal').style.display = 'none';
});

// 监听取消删除按钮
document.getElementById('cancel-delete').addEventListener('click', () => {
    document.getElementById('delete-modal').style.display = 'none';
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // 如果点击的是背景（不是弹窗内容）
            modal.style.display = 'none';
        }
    });
});

    // 初始化页面时渲染天数列表
    renderDays();
});
