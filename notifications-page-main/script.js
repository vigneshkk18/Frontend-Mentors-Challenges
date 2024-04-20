const notificationCountBadge = document.querySelector('[data-identifier="notificationCountBadge"]');
const markAllAsReadBtn = document.querySelector('[data-identifier="markAllAsRead"]');

if (markAllAsReadBtn) {
  markAllAsReadBtn.addEventListener("click", function (e) {
    notificationCountBadge.remove();

    document.querySelectorAll('.unread-badge').forEach(el => el.remove());
  });
}