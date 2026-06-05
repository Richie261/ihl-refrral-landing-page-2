import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = path.join(rootDir, 'index.html');
const outputPath = path.join(rootDir, 'webflow-package', 'REFERRALS_WEBFLOW_EMBED_V3_2026-06-05.html');

const index = fs.readFileSync(indexPath, 'utf8');

function extractBetween(source, start, end) {
  const startIndex = source.indexOf(start);
  if (startIndex === -1) throw new Error(`Could not find start marker: ${start}`);
  const endIndex = source.indexOf(end, startIndex);
  if (endIndex === -1) throw new Error(`Could not find end marker: ${end}`);
  return source.slice(startIndex + start.length, endIndex);
}

function prefixSelector(selector) {
  return selector
    .split(',')
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed) return trimmed;
      if (trimmed === 'html' || trimmed === 'body' || trimmed === 'html body') return '#ihl-referrals-v3';
      if (trimmed === '*') return '#ihl-referrals-v3 *';
      if (trimmed.startsWith('html ') || trimmed.startsWith('body ')) {
        return '#ihl-referrals-v3 ' + trimmed.replace(/^(html|body)\s+/, '');
      }
      if (trimmed.startsWith('#ihl-referrals-v3')) return trimmed;
      return '#ihl-referrals-v3 ' + trimmed;
    })
    .join(', ');
}

function findMatchingBrace(source, openIndex) {
  let depth = 0;
  for (let i = openIndex; i < source.length; i++) {
    if (source[i] === '{') depth += 1;
    if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  throw new Error('Unbalanced CSS brace');
}

function prefixCss(css) {
  let result = '';
  let cursor = 0;

  while (cursor < css.length) {
    const openIndex = css.indexOf('{', cursor);
    if (openIndex === -1) {
      result += css.slice(cursor);
      break;
    }

    const selector = css.slice(cursor, openIndex).trim();
    const closeIndex = findMatchingBrace(css, openIndex);
    const body = css.slice(openIndex + 1, closeIndex);

    if (!selector) {
      result += css.slice(cursor, closeIndex + 1);
    } else if (selector.startsWith('@media')) {
      result += `${selector} {\n${prefixCss(body)}\n}\n`;
    } else if (selector.startsWith('@')) {
      result += `${selector} {${body}}\n`;
    } else {
      result += `${prefixSelector(selector)} {${body}}\n`;
    }

    cursor = closeIndex + 1;
  }

  return result;
}

function replaceMainWrapper(html) {
  return html
    .replace('<main id="main" class="page">', '<div class="page" role="main">')
    .replace(/<\/main>\s*$/, '</div>');
}

function replacePackLinks(html) {
  return html
    .replace(/href="referrer-pack\.pdf"\s+download\s+data-ihl="pack-download"/g, 'href="WEBFLOW_REFERRER_PACK_PDF_URL" target="_blank" rel="noopener" data-ihl="pack-download"')
    .replace(/href="referrer-pack\.pdf"\s+download/g, 'href="WEBFLOW_REFERRER_PACK_PDF_URL" target="_blank" rel="noopener"');
}

function addTurnstileRows(html) {
  const uploadMarker = '        <label class="security-row">';
  const onlineMarker = '        <label class="security-row">';
  const turnstileUpload = `        <div class="field full turnstile-row">
          <div class="cf-turnstile" data-form-id="upload-form" data-sitekey="TURNSTILE_SITE_KEY_REPLACE_ME" data-theme="light" data-size="normal"></div>
          <small>Secured by Cloudflare. Referral data is submitted to IHL intake.</small>
        </div>
`;
  const turnstileOnline = `        <div class="field full turnstile-row">
          <div class="cf-turnstile" data-form-id="online-form" data-sitekey="TURNSTILE_SITE_KEY_REPLACE_ME" data-theme="light" data-size="normal"></div>
          <small>Secured by Cloudflare. Referral data is submitted to IHL intake.</small>
        </div>
`;

  const first = html.indexOf(uploadMarker);
  if (first === -1) throw new Error('Could not find upload security row');
  html = html.slice(0, first) + turnstileUpload + html.slice(first);

  const second = html.indexOf(onlineMarker, first + turnstileUpload.length + uploadMarker.length);
  if (second === -1) throw new Error('Could not find online security row');
  return html.slice(0, second) + turnstileOnline + html.slice(second);
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function minifyHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

const rawStyle = extractBetween(index, '<style>', '</style>');
const tokenCss = `
@import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=Albert+Sans:ital,wght@0,300..700;1,300..700&display=swap");
#ihl-referrals-v3 {
  --ihl-forest: #2D4E37;
  --ihl-forest-deep: #1F3826;
  --ihl-paper: #FAF8F4;
  --ihl-paper-deep: #F4F0E8;
  --ihl-ink: #1A1A1A;
  --ihl-ink-soft: #4A4A4A;
  --ihl-ink-mute: #6B6B6B;
  --ihl-rule: #E5E2DC;
  --ihl-rule-strong: #CFCBC2;
  --ihl-on-forest: #FAF8F4;
  --ihl-on-forest-mute: #C9D6CE;
  --serif: "Source Serif 4", Georgia, "Times New Roman", serif;
  --sans: "Albert Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --r-1: 2px;
  --r-2: 4px;
  --r-3: 8px;
  --shadow-pop: 0 16px 40px -16px rgba(31,56,38,0.18), 0 4px 12px -4px rgba(31,56,38,0.10);
  --ease-standard: cubic-bezier(0.2,0,0,1);
  --dur-fast: 120ms;
}
`;
let scopedStyle = tokenCss + prefixCss(rawStyle);
scopedStyle += `
.announcement_version {
  display: none !important;
}
.nav_wrap > .announcement_wrap:nth-of-type(2) {
  display: none !important;
}
html,
body {
  overflow-y: auto !important;
  height: auto !important;
  min-height: 100% !important;
  max-height: none !important;
  overscroll-behavior-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
}
body {
  touch-action: pan-y !important;
}
html[data-ihl-referrals-scroll-ready="true"],
html[data-ihl-referrals-scroll-ready="true"] body {
  overflow-y: auto !important;
  height: auto !important;
  max-height: none !important;
}
#ihl-referrals-v3 {
  width: 100%;
  max-width: 100%;
  display: block;
  overflow-x: hidden;
  overflow-y: visible !important;
  background: var(--ihl-paper);
  color: var(--ihl-ink);
  font-family: var(--sans);
  touch-action: pan-y;
}
#ihl-referrals-v3,
#ihl-referrals-v3 * {
  box-sizing: border-box;
}
#ihl-referrals-v3 .page,
#ihl-referrals-v3 .hero-grid,
#ihl-referrals-v3 .referral-module,
#ihl-referrals-v3 .route-form,
#ihl-referrals-v3 .form-section {
  overflow: visible !important;
  height: auto !important;
  max-height: none !important;
}
#ihl-referrals-v3 .turnstile-row {
  grid-column: 1 / -1;
  padding: 12px;
  border: 1px solid var(--ihl-rule);
  border-radius: var(--r-2);
  background: var(--ihl-paper-deep);
}
#ihl-referrals-v3 .turnstile-row .cf-turnstile {
  min-height: 65px;
}
#ihl-referrals-v3 .form-status.is-success {
  background: #f2f7f1;
  border: 1px solid #cbdcc9;
  color: #23452d;
}
`;
scopedStyle = minifyCss(scopedStyle);

let mainHtml = extractBetween(index, '<main id="main" class="page">', '</main>');
mainHtml = '<main id="main" class="page">' + mainHtml + '</main>';
mainHtml = replaceMainWrapper(mainHtml);
mainHtml = replacePackLinks(mainHtml);
mainHtml = addTurnstileRows(mainHtml);
mainHtml = minifyHtml(mainHtml);

const script = String.raw`
<script>
(function () {
  'use strict';

  var root = document.getElementById('ihl-referrals-v3');
  if (!root) return;

  function restorePageScroll() {
    document.documentElement.setAttribute('data-ihl-referrals-scroll-ready', 'true');

    [document.documentElement, document.body].forEach(function (node) {
      if (!node) return;
      node.style.overflowY = 'auto';
      node.style.height = 'auto';
      node.style.maxHeight = 'none';
      node.style.webkitOverflowScrolling = 'touch';
    });

    if (document.body) {
      document.body.style.touchAction = 'pan-y';
      if (document.body.style.position === 'fixed') {
        document.body.style.position = '';
      }
    }

    var node = root;
    while (node && node !== document.body) {
      if (node.style) {
        node.style.overflowY = 'visible';
        node.style.maxHeight = 'none';
      }
      node = node.parentElement;
    }
  }

  function cleanupPrototypeArtifacts() {
    document.querySelectorAll('.announcement_version').forEach(function (node) {
      node.remove();
    });
    document.querySelectorAll('.announcement_wrap').forEach(function (node) {
      if (/This is some text inside of a div block|\\bv1\\b/.test(node.textContent || '')) {
        node.remove();
      }
    });
  }

  cleanupPrototypeArtifacts();
  setTimeout(cleanupPrototypeArtifacts, 600);
  restorePageScroll();
  requestAnimationFrame(restorePageScroll);
  setTimeout(restorePageScroll, 700);

  var INTAKE_URL = 'APPS_SCRIPT_INTAKE_URL_REPLACE_ME';
  var MAX_FILES = 6;
  var MAX_FILE_BYTES = 5 * 1024 * 1024;
  var MAX_TOTAL_BYTES = 10 * 1024 * 1024;
  var ALLOWED_EXT = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
  var ALLOWED_MIME = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ];
  var turnstileTokens = {};
  var widgets = [];

  root.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-copy');
      var label = button.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).catch(function () {});
      }
      button.textContent = 'Copied';
      setTimeout(function () { button.textContent = label; }, 1400);
    });
  });

  var routeButtons = root.querySelectorAll('[data-route]');
  var forms = root.querySelectorAll('[data-route-form]');
  routeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var route = button.getAttribute('data-route');
      routeButtons.forEach(function (item) {
        var active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      forms.forEach(function (form) {
        form.classList.toggle('is-active', form.getAttribute('data-route-form') === route);
      });
      restorePageScroll();
    });
  });

  function showStatus(form, kind, message) {
    var box = form.querySelector('.form-status');
    if (!box) return;
    box.className = 'form-status is-on is-' + kind;
    box.textContent = message;
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function clearStatus(form) {
    var box = form.querySelector('.form-status');
    if (!box) return;
    box.className = 'form-status';
    box.textContent = '';
  }

  function getValue(form, name) {
    var element = form.elements[name];
    if (!element) return '';
    if (element instanceof RadioNodeList) {
      var checked = form.querySelector('[name="' + name + '"]:checked');
      return checked ? checked.value.trim() : '';
    }
    return element.value ? String(element.value).trim() : '';
  }

  function checkedValues(form, name) {
    return Array.prototype.slice.call(form.querySelectorAll('[name="' + name + '"]:checked')).map(function (input) {
      return input.value;
    });
  }

  function hasChecked(form, name) {
    return checkedValues(form, name).length > 0;
  }

  function fileInputs(form) {
    return Array.prototype.slice.call(form.querySelectorAll('input[type="file"]'));
  }

  function filesForForm(form) {
    var files = [];
    fileInputs(form).forEach(function (input) {
      Array.prototype.slice.call(input.files || []).forEach(function (file) {
        files.push(file);
      });
    });
    return files;
  }

  function validateFile(file) {
    var name = file && file.name ? file.name : 'attachment';
    var ext = name.indexOf('.') > -1 ? name.split('.').pop().toLowerCase() : '';
    var mime = file && file.type ? file.type : '';
    if (ALLOWED_EXT.indexOf(ext) === -1 && ALLOWED_MIME.indexOf(mime) === -1) {
      return { ok: false, message: 'Unsupported attachment type. Please upload PDF, DOC, DOCX, JPG/JPEG or PNG files only.' };
    }
    if (file.size > MAX_FILE_BYTES) {
      return { ok: false, message: '"' + name + '" is too large. Please keep each attachment under 5 MB, or email larger files to intake@institute4healthyliving.com.' };
    }
    return { ok: true };
  }

  function readFiles(files) {
    var total = 0;
    if (files.length > MAX_FILES) {
      return Promise.reject(new Error('Please attach no more than ' + MAX_FILES + ' files, or email intake@institute4healthyliving.com.'));
    }
    for (var i = 0; i < files.length; i += 1) {
      var check = validateFile(files[i]);
      if (!check.ok) return Promise.reject(new Error(check.message));
      total += files[i].size || 0;
    }
    if (total > MAX_TOTAL_BYTES) {
      return Promise.reject(new Error('The attached files are too large together. Please keep total attachments under 10 MB, or email larger files to intake@institute4healthyliving.com.'));
    }
    return Promise.all(files.map(function (file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (event) {
          resolve({
            b64: String(event.target.result || '').split(',')[1],
            name: file.name,
            mime: file.type || 'application/octet-stream'
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }));
  }

  function getLastName(name) {
    var parts = String(name || '').trim().split(/\s+/);
    return (parts[parts.length - 1] || 'Unknown').replace(/[^a-zA-Z]/g, '') || 'Unknown';
  }

  function formatDate(date) {
    return String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
  }

  function riskValue(form) {
    var risk = getValue(form, 'risk_context');
    if (risk === 'additional') return '3';
    if (risk === 'higher') return '4';
    if (risk === 'discussion') return '4';
    return '1';
  }

  function longClinicalNote(form, route) {
    var lines = [];
    lines.push('Submission route: ' + getValue(form, 'submission_route'));

    if (route === 'upload') {
      lines.push('Document type: ' + getValue(form, 'document_type'));
      lines.push('Referrer role: ' + getValue(form, 'referrer_role'));
      lines.push('Routing note: ' + getValue(form, 'routing_note'));
    } else {
      lines.push('Patient DOB: ' + getValue(form, 'dob'));
      lines.push('Patient address/suburb: ' + getValue(form, 'address_suburb'));
      lines.push('Referral date: ' + getValue(form, 'referral_date'));
      lines.push('Plan/referral type: ' + getValue(form, 'plan_type'));
      lines.push('Sessions requested or remaining: ' + getValue(form, 'sessions_requested_or_remaining'));
      lines.push('Therapy type: ' + checkedValues(form, 'therapy_type').join(', '));
      lines.push('Patient concern / risk context: ' + getValue(form, 'risk_context'));
      lines.push('Symptoms / presenting concerns: ' + getValue(form, 'presenting_concerns'));
      lines.push('Diagnosis and medications, if known: ' + getValue(form, 'diagnosis_medications'));
      lines.push('Brief note for intake: ' + getValue(form, 'risk_note'));
      lines.push('Provider number: ' + getValue(form, 'provider_number'));
      lines.push('Referrer role: ' + getValue(form, 'profession_role'));
      lines.push('Typed/electronic signature: ' + getValue(form, 'signature'));
      lines.push('Signature timestamp from browser: ' + getValue(form, 'signature_timestamp_local'));
    }

    lines.push('Data boundary: patient and clinical content must remain in the secure intake workflow and must not be stored in HubSpot.');
    return lines.filter(function (line) {
      return line.replace(/^[^:]+:\s*/, '').trim() !== '';
    }).join('\n');
  }

  function mapPayload(form, route) {
    var patientName = getValue(form, 'patient_name');
    var referrerName = getValue(form, 'referrer_name');
    var referrerRole = route === 'upload' ? getValue(form, 'referrer_role') : getValue(form, 'profession_role');
    var therapy = route === 'upload' ? getValue(form, 'document_type') : checkedValues(form, 'therapy_type').join(', ');

    return {
      rname: referrerName,
      rpract: getValue(form, 'practice'),
      rphone: route === 'upload' ? '' : getValue(form, 'referrer_phone'),
      remail: getValue(form, 'referrer_email'),
      pname: patientName,
      pphone: getValue(form, 'patient_phone'),
      pemail: '',
      age: '',
      gname: '',
      gphone: '',
      gemail: '',
      therapy: therapy,
      risk: route === 'online' ? riskValue(form) : '1',
      concerns: longClinicalNote(form, route),
      turnstile_token: turnstileTokens[form.id] || '',
      submission_timestamp: new Date().toISOString(),
      referrerLastName: getLastName(referrerName || referrerRole),
      patientLastName: getLastName(patientName),
      submissionDate: formatDate(new Date())
    };
  }

  function validateRouteRules(form, route) {
    if (route === 'online') {
      if (!hasChecked(form, 'therapy_type')) {
        showStatus(form, 'error', 'Please select at least one therapy type.');
        return false;
      }

      var risk = getValue(form, 'risk_context');
      var note = form.querySelector('#online-risk-note');
      var files = filesForForm(form);
      var needsContext = risk === 'additional' || risk === 'higher' || risk === 'discussion';
      if (needsContext && (!note || !note.value.trim()) && files.length === 0) {
        showStatus(form, 'error', 'Please add a short note for intake or attach the referral, plan or letter.');
        if (note) note.focus();
        return false;
      }
      if (risk === 'discussion' && !getValue(form, 'referrer_phone')) {
        showStatus(form, 'error', 'Please provide a direct referrer phone or mobile number for discussion requests.');
        var phone = form.querySelector('#online-referrer-phone');
        if (phone) phone.focus();
        return false;
      }
    }
    return true;
  }

  function resetTurnstile(formId) {
    if (!window.turnstile) return;
    widgets.forEach(function (item) {
      if (item.formId === formId) {
        try { window.turnstile.reset(item.widgetId); } catch (error) {}
      }
    });
  }

  function submitForm(form, route) {
    clearStatus(form);

    if (form.elements.website && form.elements.website.value.trim() !== '') return;

    var signatureTimestamp = form.querySelector('[data-signature-timestamp]');
    if (signatureTimestamp) signatureTimestamp.value = new Date().toISOString();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!validateRouteRules(form, route)) return;

    if (!turnstileTokens[form.id]) {
      showStatus(form, 'error', 'Please complete the security check.');
      return;
    }

    if (INTAKE_URL.indexOf('REPLACE_ME') !== -1) {
      showStatus(form, 'error', 'This Webflow embed still needs the approved secure intake endpoint added before public submissions can be accepted.');
      return;
    }

    var submit = form.querySelector('button[type="submit"]');
    var submitText = submit ? submit.textContent : '';
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Submitting...';
    }

    var payload = mapPayload(form, route);
    readFiles(filesForForm(form)).then(function (files) {
      var body = new URLSearchParams();
      Object.keys(payload).forEach(function (key) { body.append(key, payload[key]); });
      files.forEach(function (file) {
        body.append('fileData[]', file.b64);
        body.append('fileName[]', file.name);
        body.append('fileMime[]', file.mime);
      });
      return fetch(INTAKE_URL, { method: 'POST', body: body });
    }).then(function (response) {
      if (!response.ok) throw new Error('Referral submission failed. Please try again or email intake@institute4healthyliving.com.');
      return response.json();
    }).then(function (data) {
      if (!data || !data.success) throw new Error((data && data.error) || 'Referral submission failed. Please try again or email intake@institute4healthyliving.com.');
      form.reset();
      turnstileTokens[form.id] = '';
      resetTurnstile(form.id);
      showStatus(form, 'success', 'Thank you. Your referral has been received by the IHL intake team and will be reviewed during business hours.');
    }).catch(function (error) {
      showStatus(form, 'error', error && error.message ? error.message : 'Referral submission failed. Please try again or email intake@institute4healthyliving.com.');
    }).finally(function () {
      if (submit) {
        submit.disabled = false;
        submit.textContent = submitText;
      }
    });
  }

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      submitForm(form, form.getAttribute('data-route-form'));
    });
  });

  function renderTurnstile() {
    if (!window.turnstile) return;
    root.querySelectorAll('.cf-turnstile').forEach(function (widget) {
      if (widget.getAttribute('data-rendered') === 'true') return;
      var formId = widget.getAttribute('data-form-id');
      var widgetId = window.turnstile.render(widget, {
        sitekey: widget.getAttribute('data-sitekey'),
        theme: widget.getAttribute('data-theme') || 'light',
        size: widget.getAttribute('data-size') || 'normal',
        callback: function (token) { turnstileTokens[formId] = token; },
        'expired-callback': function () { turnstileTokens[formId] = ''; },
        'error-callback': function () { turnstileTokens[formId] = ''; }
      });
      widgets.push({ formId: formId, widgetId: widgetId });
      widget.setAttribute('data-rendered', 'true');
    });
    restorePageScroll();
  }

  window.ihlReferralGatewayV3RenderTurnstile = renderTurnstile;
  if (window.turnstile) {
    renderTurnstile();
  } else {
    var script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=ihlReferralGatewayV3RenderTurnstile';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  ['wheel', 'touchstart', 'touchmove', 'keydown'].forEach(function (eventName) {
    root.addEventListener(eventName, restorePageScroll, { passive: true });
  });
})();
</script>`;

const output = `<!-- IHL referrals V3 Webflow embed. Replace PDF, Turnstile site key and intake endpoint before publish. No patient/clinical content to HubSpot. -->
<div id="ihl-referrals-v3" data-ihl-referrals-gateway><style>${scopedStyle}</style>${mainHtml}</div>
${script}
`;

fs.writeFileSync(outputPath, output);
console.log(`Wrote ${path.relative(rootDir, outputPath)}`);
