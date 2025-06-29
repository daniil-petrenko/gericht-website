export default function customSelect() {
	document.addEventListener('DOMContentLoaded', () => {
	  document.querySelectorAll('select[data-custom-select]').forEach(select => {
	    const customSelect = document.createElement('div');
	    customSelect.classList.add('custom-select');
	    select.parentNode.insertBefore(customSelect, select);
	    customSelect.appendChild(select);
	    select.style.display = 'none';

	    const selected = document.createElement('button');
	    selected.type = 'button';
	    selected.classList.add('custom-select__selected');
	    selected.innerHTML = `${select.options[select.selectedIndex].text}`;
	    customSelect.appendChild(selected);

	    const optionsList = document.createElement('ul');
	    optionsList.classList.add('custom-select__options');
	    customSelect.appendChild(optionsList);

	    Array.from(select.options).forEach(option => {
	      const li = document.createElement('li');
	      li.textContent = option.text;
	      li.tabIndex = 0;
	      li.dataset.value = option.value;
	      optionsList.appendChild(li);
	    });

	    let isOpen = false;


	    function toggleOptions(forceClose = false) {
			  if (isOpen || forceClose) {
			    optionsList.classList.remove('open', 'scrollable');
			    customSelect.classList.remove('open');
			    isOpen = false;
			    selected.setAttribute('aria-expanded', 'false');
			  } else {
			    optionsList.classList.add('open');
			    customSelect.classList.add('open');

			    requestAnimationFrame(() => {
			      if (optionsList.scrollHeight > 200) {
			        optionsList.classList.add('scrollable');
			      } else {
			        optionsList.classList.remove('scrollable');
			      }
			    });

			    isOpen = true;
			    selected.setAttribute('aria-expanded', 'true');
			  }
			}

	    optionsList.addEventListener('click', e => {
	      const target = e.target.closest('li');
	      if (target) {
	        select.value = target.dataset.value;
	        selected.innerHTML = `${target.textContent}`;
	        toggleOptions(true);
	      }
	    });

	    selected.addEventListener('click', e => {
	      e.preventDefault();
	      e.stopPropagation();
	      toggleOptions();
	    });

	    document.addEventListener('click', () => {
	      if (isOpen) toggleOptions(true);
	    });

	    selected.addEventListener('keydown', e => {
	      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
	        e.preventDefault();
	        toggleOptions();
	      }
	    });

	    optionsList.addEventListener('keydown', e => {
			  const items = Array.from(optionsList.children);
			  const currentIndex = items.indexOf(document.activeElement);

			  if (e.key === 'ArrowDown') {
			    e.preventDefault();
			    const next = items[currentIndex + 1] || items[0];
			    next.focus();
			  } else if (e.key === 'ArrowUp') {
			    e.preventDefault();
			    const prev = items[currentIndex - 1] || items[items.length - 1];
			    prev.focus();
			  } else if (e.key === 'Enter' || e.key === ' ') {
			    e.preventDefault();
			    const active = document.activeElement;
			    if (active && active.dataset.value !== undefined) {
			      select.value = active.dataset.value;
			      selected.innerHTML = `${active.textContent}`;
			      toggleOptions(true);
			      selected.focus();
			    }
			  } else if (e.key === 'Escape') {
			    e.preventDefault();
			    toggleOptions(true);
			    selected.focus();
			  } else if (e.key === 'Tab') {
			    toggleOptions(true);
			  }
			});
	  });
	});
}