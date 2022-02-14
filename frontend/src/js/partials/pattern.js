import 'prismjs/prism.js';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-twig';
import 'prismjs/components/prism-json';

// Setup each Pattern
const patterns = document.querySelectorAll('.primer-pattern');

patterns.forEach((pattern) => {
    pattern.classList.add('primer-pattern--enhanced');

    const codeBlocks = pattern.querySelectorAll('.primer-tab__code');

    codeBlocks.forEach((codeBlock) => {
        Prism.highlightElement(codeBlock);
    });
});

// Setup each set of Tabs
const tabs = document.querySelectorAll('.primer-tabs');

tabs.forEach((tabs) => {
    const links = tabs.querySelectorAll('.primer-tabs-toc__link');
    const panels = tabs.querySelectorAll('.primer-tab');

    panels.forEach((panel) => {
        panel.setAttribute('hidden', true);
    });

    links.forEach((l) => {
        l.setAttribute('aria-selected', false);
    });

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            let shouldDeselect = link.getAttribute('aria-selected') === 'true';

            const id = link.getAttribute('href').replace('#', '');

            panels.forEach((panel) => {
                if (panel.id === id && !shouldDeselect) {
                    panel.removeAttribute('hidden');
                } else {
                    panel.setAttribute('hidden', true);
                }
            });

            links.forEach((l) => {
                l.setAttribute('aria-selected', false);
            });

            if (!shouldDeselect) {
                link.setAttribute('aria-selected', true);
            }
        });
    });
});

// Setup all State options
const stateControls = document.querySelectorAll('.primer-pattern__states');

stateControls.forEach((stateControl) => {
    const select = document.createElement('select');
    select.classList.add('primer-pattern__states-select');

    stateControl.querySelectorAll('.primer-pattern__state-link').forEach((state) => {
        const option = document.createElement('option');
        option.innerText = state.innerText;
        option.setAttribute('data-url', state.getAttribute('href'));

        select.appendChild(option);

        if (state.classList.contains('primer-pattern__state-link--current')) {
            select.selectedIndex = select.options.length - 1;
        }
    });

    const div = document.createElement('div');
    div.classList.add('primer-pattern__states-select-container');
    div.appendChild(select);

    stateControl.replaceWith(div);

    select.addEventListener('change', (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const url = selectedOption.dataset.url;

        window.location = url;
    });
});
