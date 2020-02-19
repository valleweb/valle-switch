import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

class ValleSwitch extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        };

        :host([disabled]) {
          cursor: not-allowed;
        }

        .input {
          display: none;
        };

        .label {
          margin: 0 10px;
          font-size: 14px;
          font-family: sans-serif;
          color: var(--valle-label-switch-color, #666666);
        };

        .toggle {
          position: relative;
          cursor: pointer;
          outline: none;
          user-select: none;
          width: 36px;
          height: 12px;
          background-color: var(--valle-switch-background, #dddddd);
          border-radius: 30px;
          transition: background-color .4s;
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
        };

        .toggle::after {
          content: "";
          display: block;
          width: 20px;
          height: 20px;
          background-color: var(--valle-switch-toggle, #81898a);
          border-radius: 50%;
          transition: transform .4s, background-color .4s;
        };

        .input:checked + .toggle {
          background-color: var(--valle-switch-background-checked, #cbefd8);
        };

        .input:checked + .toggle::after {
          transform: translateX(16px);
          background-color: var(--valle-switch-toggle-checked, #62aeb3);
        };

        .input:disabled + .toggle {
          pointer-events: none;
          opacity: .5;
        };

        .input:disabled + .toggle::after {
          opacity: .5;
        };
      </style>

      <label class="label" for="input">[[labelLeft]]</label>

      <input
        id="input"
        class="input"
        type="checkbox"
      />
      <label class="toggle" for="input"></label>

      <label class="label" for="input">[[labelRight]]</label>
    `;
	}
	
	static get properties() {
		return {
      labelLeft: String,
      labelRight: String,
      checked: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_toogleChecked'
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: '_toogleDisabled'
      }
		}
  }
  
  ready() {
    super.ready();

    this.addEventListener('click', () => {
      if (this.disabled) {
        return false;
      } else {
        this.checked
          ? this.checked = false
          : this.checked = true;
      }
    });
  }

  _toogleDisabled(disabled) {
    disabled
      ? this.$.input.setAttribute('disabled', true)
      : this.$.input.removeAttribute('disabled');
  };

  _toogleChecked(checked) {
    if (checked) {
      this.$.input.setAttribute('checked', true);
    } else {
      this.$.input.removeAttribute('checked');
    }
  };
};

customElements.define('valle-switch', ValleSwitch);
