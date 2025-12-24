function viewExample(example) {
    document.querySelectorAll('div[id]').forEach(div => {
        div.style.display = 'none';
    });
    document.querySelector(`#${example}`).style.display = 'block';
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('button').forEach(button => {
        button.onclick = function() {
            viewExample(this.dataset.page);
        }
    });
});
//Torture RRRRAAAGGGHHHH