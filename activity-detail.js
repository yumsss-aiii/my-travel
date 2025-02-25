// 获取 URL 参数
const urlParams = new URLSearchParams(window.location.search);
const destinationIndex = urlParams.get('destination');
const dayIndex = urlParams.get('day');
const activityIndex = urlParams.get('activity');

// 获取数据
let destinations = JSON.parse(localStorage.getItem('destinations'));
const destination = destinations[destinationIndex];
const day = destination.days[dayIndex];
const activity = day.activities[activityIndex];

// 初始化活动内容（如果为空，初始化为一个空数组）
activity.contents = activity.contents || [];

// 获取 DOM 元素
const addNewContentButton = document.getElementById('add-new-content');
const contentContainer = document.getElementById('content-container');
const saveActivityButton = document.getElementById('save-activity');

// 初始渲染现有内容
activity.contents.forEach((content, index) => {
    addContentInput(content, index); // 渲染现有的内容
});

// 添加新内容
addNewContentButton.addEventListener('click', function () {
    const newContent = { text: '', description: '', image: '' };  // 默认值
    activity.contents.push(newContent);
    localStorage.setItem('destinations', JSON.stringify(destinations));
    addContentInput(newContent, activity.contents.length - 1);
});

// 渲染输入区域
function addContentInput(content, index) {
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content-item');
    contentDiv.dataset.index = index;

    // 创建活动名称输入框
    const nameLabel = document.createElement('label');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = content.text || '';
    nameInput.placeholder = '请输入活动名称';
    nameInput.style.width = '95%';  // 设置输入框宽度为页面的80%，你可以修改为其他值
    nameInput.style.maxWidth = '500px';  // 设置最大宽度，避免太长
    nameInput.addEventListener('input', function () {
        activity.text = nameInput.value;

    localStorage.setItem('destinations', JSON.stringify(destinations));

    });
nameInput.value = content.text || ''; 

    // 创建活动描述输入框
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('textarea');
    descriptionInput.placeholder = '请输入活动描述';
    descriptionInput.value = content.description || '';
    descriptionInput.style.width = '95%';  // 设置输入框宽度为页面的80%，你可以修改为其他值
    descriptionInput.style.maxWidth = '500px';  // 设置最大宽度，避免太长
    descriptionInput.addEventListener('input', function () {
        content.description = descriptionInput.value;
    });

    // 创建图片上传框
    const imageLabel = document.createElement('label');
    imageLabel.textContent = '上传图片：';
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';
    const imagePreview = document.createElement('div');
    if (content.image) {
        imagePreview.innerHTML = `<img src="${content.image}" alt="活动图片" style="max-width: 100%;">`;
    }

    // 图片上传处理
    imageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="上传的图片" style="max-width: 100%;">`;
                content.image = event.target.result;  // 保存Base64图片
            };
            reader.readAsDataURL(file);
        }
    });

    // 删除按钮
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.addEventListener('click', function () {
        deleteContent(index);
    });

    contentDiv.appendChild(nameLabel);
    contentDiv.appendChild(nameInput);
    contentDiv.appendChild(descriptionLabel);
    contentDiv.appendChild(descriptionInput);
    contentDiv.appendChild(imageLabel);
    contentDiv.appendChild(imageInput);
    contentDiv.appendChild(imagePreview);
    contentDiv.appendChild(deleteButton);

    contentContainer.appendChild(contentDiv);
}

// 获取删除弹窗元素
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');

// 删除内容
function deleteContent(index) {
    // 显示确认删除弹窗
    deleteModal.style.display = 'flex';

    // 确认删除
    confirmDeleteButton.addEventListener('click', function () {
        activity.contents.splice(index, 1);  // 删除指定的内容
        localStorage.setItem('destinations', JSON.stringify(destinations)); // 更新本地存储
        document.querySelector(`.content-item[data-index="${index}"]`).remove(); // 删除DOM中的内容
        deleteModal.style.display = 'none'; // 关闭弹窗
    });

    // 取消删除
    cancelDeleteButton.addEventListener('click', function () {
        deleteModal.style.display = 'none'; // 关闭弹窗
    });
}

// 获取保存弹窗元素
const saveModal = document.getElementById('save-modal');
const confirmSaveButton = document.getElementById('confirm-save');
const cancelSaveButton = document.getElementById('cancel-save');

// 显示保存确认弹窗
saveActivityButton.addEventListener('click', function (event) {
    event.preventDefault();  // 阻止默认行为（防止跳转）

 console.log("保存按钮被点击了！");

    // 显示保存确认弹窗
    saveModal.style.display = 'flex';
});

// 确认保存按钮的点击事件
confirmSaveButton.addEventListener('click', function () {
    // 保存所有修改后的内容
    localStorage.setItem('destinations', JSON.stringify(destinations));
      // 可选：添加保存提示

    // 关闭弹窗
    saveModal.style.display = 'none';
});

// 取消保存按钮的点击事件
cancelSaveButton.addEventListener('click', function () {
    saveModal.style.display = 'none'; // 关闭弹窗
});
