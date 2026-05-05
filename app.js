const translations = {
    en: {
        app_title: "Limorina Color Checker",
        input_color: "Input Color",
        variations: "Tints, Shades & Tones",
        tints: "Tints (Mix with White)",
        shades: "Shades (Mix with Black)",
        tones: "Tones (Mix with Grey)",
        harmonies: "Color Harmonies",
        copied: "Copied to clipboard!",
        complementary: "Complementary",
        analogous: "Analogous",
        triadic: "Triadic",
        tetradic: "Tetradic",
        monochromatic: "Monochromatic",
        accessibility: "WCAG Accessibility",
        best_text: "Best Text Color",
        saved_palette: "Saved Palette",
        save_btn: "Save to Palette",
        on_white: "On White",
        on_black: "On Black",
        export_hub: "Export Hub",
        copy_all: "Copy All Template",
        help_title: "User Guide & Glossary",
        guide_color_formats_title: "1. Color Formats",
        guide_color_formats_desc: "How color is represented in code.",
        desc_hex: "6-digit code (e.g. #6750A4). Standard for web design.",
        desc_rgb: "Red, Green, Blue (0-255). Used for screen displays.",
        desc_hsl: "Hue (color), Saturation (intensity), Lightness (brightness). Great for designers.",
        desc_cmyk: "Cyan, Magenta, Yellow, Black (0-100%). Used for physical printing.",
        guide_variations_title: "2. Color Variations",
        desc_tints: "Colors mixed with White. Increases light.",
        desc_shades: "Colors mixed with Black. Decreases light.",
        desc_tones: "Colors mixed with Grey. Mutes the color.",
        guide_wcag_title: "3. Accessibility (WCAG)",
        guide_wcag_desc: "WCAG ensures colors are readable for everyone, including those with visual impairments.",
        desc_ratio: "Brightness difference. Higher is better.",
        desc_aa: "Standard compliance (4.5:1 ratio). Recommended for all websites.",
        desc_aaa: "Enhanced compliance (7:1 ratio). Highest accessibility tier.",
        guide_harmonies_title: "4. Color Harmonies",
        guide_harmonies_desc: "Predefined rules for picking colors that look good together based on the color wheel.",
        got_it: "Got it!"
    },
    vi: {
        app_title: "Limorina Color Checker",
        input_color: "Nhập mã màu",
        variations: "Sắc độ & Sắc thái",
        tints: "Sắc sáng (Pha với trắng)",
        shades: "Sắc tối (Pha với đen)",
        tones: "Sắc trung (Pha với xám)",
        harmonies: "Nguyên tắc phối màu",
        copied: "Đã sao chép!",
        complementary: "Phối màu Bổ túc",
        analogous: "Phối màu Tương đồng",
        triadic: "Phối màu Tam giác",
        tetradic: "Phối màu Chữ nhật",
        monochromatic: "Phối màu Đơn sắc",
        accessibility: "Độ tương phản WCAG",
        best_text: "Màu chữ tốt nhất",
        saved_palette: "Bảng màu đã lưu",
        save_btn: "Lưu vào bảng màu",
        on_white: "Trên nền Trắng",
        on_black: "Trên nền Đen",
        export_hub: "Cổng xuất dữ liệu",
        copy_all: "Sao chép tất cả",
        help_title: "Hướng dẫn & Giải nghĩa",
        guide_color_formats_title: "1. Định dạng màu",
        guide_color_formats_desc: "Cách màu sắc được biểu diễn trong mã nguồn.",
        desc_hex: "Mã 6 ký tự (VD: #6750A4). Tiêu chuẩn thiết kế web.",
        desc_rgb: "Đỏ, Xanh lá, Xanh dương (0-255). Dùng cho màn hình.",
        desc_hsl: "Sắc màu, Độ bão hòa, Độ sáng. Rất trực quan cho thiết kế.",
        desc_cmyk: "Lục lam, Hồng sẫm, Vàng, Đen (0-100%). Dùng cho in ấn thực tế.",
        guide_variations_title: "2. Biến thể màu sắc",
        desc_tints: "Màu pha với Trắng. Làm màu sáng hơn.",
        desc_shades: "Màu pha với Đen. Làm màu tối đi.",
        desc_tones: "Màu pha với Xám. Làm màu đục/dịu hơn.",
        guide_wcag_title: "3. Độ tương phản (WCAG)",
        guide_wcag_desc: "Tiêu chuẩn giúp nội dung dễ đọc cho tất cả mọi người, kể cả người khiếm thị.",
        desc_ratio: "Sự khác biệt độ sáng. Càng cao càng dễ đọc.",
        desc_aa: "Mức tiêu chuẩn (tỉ lệ 4.5:1). Khuyên dùng cho mọi web.",
        desc_aaa: "Mức cao nhất (tỉ lệ 7:1). Khả năng tiếp cận tối đa.",
        guide_harmonies_title: "4. Nguyên tắc phối màu",
        guide_harmonies_desc: "Các quy luật chọn màu sắc hài hòa dựa trên vòng tròn màu sắc.",
        got_it: "Đã hiểu!"
    }
};

let currentLang = 'en';

// --- Color Utilities ---
const ColorUtils = {
    hexToRgb(hex) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return { r, g, b };
    },

    rgbToHex(r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    },

    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) h = s = 0;
        else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: h * 360, s: s * 100, l: l * 100 };
    },

    hslToRgb(h, s, l) {
        s /= 100; l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return {
            r: Math.round(255 * f(0)),
            g: Math.round(255 * f(8)),
            b: Math.round(255 * f(4))
        };
    },

    rgbToCmyk(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const k = 1 - Math.max(r, g, b);
        if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
        const c = (1 - r - k) / (1 - k);
        const m = (1 - g - k) / (1 - k);
        const y = (1 - b - k) / (1 - k);
        return {
            c: Math.round(c * 100),
            m: Math.round(m * 100),
            y: Math.round(y * 100),
            k: Math.round(k * 100)
        };
    },

    mixColors(rgb1, rgb2, weight) {
        const w = weight / 100;
        return {
            r: Math.round(rgb1.r * (1 - w) + rgb2.r * w),
            g: Math.round(rgb1.g * (1 - w) + rgb2.g * w),
            b: Math.round(rgb1.b * (1 - w) + rgb2.b * w)
        };
    },

    getLuminance(r, g, b) {
        const a = [r, g, b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    },

    getContrastRatio(rgb1, rgb2) {
        const L1 = ColorUtils.getLuminance(rgb1.r, rgb1.g, rgb1.b);
        const L2 = ColorUtils.getLuminance(rgb2.r, rgb2.g, rgb2.b);
        return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    },

    rgbToOklch(r, g, b) {
        // Normalize
        r /= 255; g /= 255; b /= 255;

        // Linearize sRGB
        const linR = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        const linG = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        const linB = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

        // OKLab transformation
        const l = 0.4122214708 * linR + 0.5363325363 * linG + 0.0514459929 * linB;
        const m = 0.2119034982 * linR + 0.6806995451 * linG + 0.1073969566 * linB;
        const s = 0.0883024619 * linR + 0.2817188376 * linG + 0.6299787005 * linB;

        const l_ = Math.cbrt(l);
        const m_ = Math.cbrt(m);
        const s_ = Math.cbrt(s);

        const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720403 * s_;
        const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
        const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

        // OKLab to OKLCH
        const C = Math.sqrt(a * a + b_ * b_);
        let h = Math.atan2(b_, a) * 180 / Math.PI;
        if (h < 0) h += 360;

        return { l: L * 100, c: C, h: h };
    },

    getColorName(hex) {
        if (!window.ntc) return "Unknown";
        const result = ntc.name("#" + hex);
        return result[1];
    },

    simulateBlindness(rgb, type) {
        const matrices = {
            protanopia: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
            deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
            tritanopia: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
            achromatopsia: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114]
        };
        const m = matrices[type] || matrices.achromatopsia;
        return {
            r: Math.round(rgb.r * m[0] + rgb.g * m[1] + rgb.b * m[2]),
            g: Math.round(rgb.r * m[3] + rgb.g * m[4] + rgb.b * m[5]),
            b: Math.round(rgb.r * m[6] + rgb.g * m[7] + rgb.b * m[8])
        };
    }
};

// --- App State & UI ---
const state = {
    cmyk: { c: 37, m: 51, y: 0, k: 36 },
    oklch: { l: 48, c: 0.15, h: 256 },
    palette: JSON.parse(localStorage.getItem('saved_palette') || '[]'),
    activeHex: localStorage.getItem('active_hex') || "6750A4"
};

const dom = {
    hexInput: document.getElementById('hex-input'),
    colorPicker: document.getElementById('color-picker'),
    preview: document.getElementById('color-preview'),
    rgbOutput: document.getElementById('rgb-output'),
    hslOutput: document.getElementById('hsl-output'),
    cmykOutput: document.getElementById('cmyk-output'),
    tintsRow: document.getElementById('tints-row'),
    shadesRow: document.getElementById('shades-row'),
    tonesRow: document.getElementById('tones-row'),
    harmoniesContainer: document.getElementById('harmonies-container'),
    themeToggle: document.getElementById('theme-toggle'),
    langToggle: document.getElementById('lang-toggle'),
    exportHubBtn: document.getElementById('export-hub-btn'),
    exportModal: document.getElementById('export-modal'),
    helpBtn: document.getElementById('help-btn'),
    helpModal: document.getElementById('help-modal'),
    closeHelp: document.getElementById('close-help'),
    closeHelpConfirm: document.getElementById('close-help-confirm'),
    closeModal: document.getElementById('close-modal'),
    copyExportBtn: document.getElementById('copy-export'),
    appTitle: document.getElementById('app-title'),
    toast: document.getElementById('toast'),
    wcagWhiteRatio: document.getElementById('wcag-white-ratio'),
    wcagBlackRatio: document.getElementById('wcag-black-ratio'),
    wcagWhiteBadges: document.getElementById('wcag-white-badges'),
    saveBtn: document.getElementById('save-to-palette'),
    paletteContainer: document.getElementById('palette-colors'),
    exportImageBtn: document.getElementById('export-image-btn'),
    mixerInputs: {
        r: document.getElementById('rgb-r'),
        g: document.getElementById('rgb-g'),
        b: document.getElementById('rgb-b'),
        h: document.getElementById('hsl-h'),
        s: document.getElementById('hsl-s'),
        l: document.getElementById('hsl-l')
    },
    cbSimulator: document.getElementById('cb-simulator')
};

function updateColorState(hex) {
    if (!/^[0-9A-F]{6}$/i.test(hex)) return;
    state.activeHex = hex.toUpperCase();
    state.hex = state.activeHex;
    state.rgb = ColorUtils.hexToRgb(state.hex);
    state.hsl = ColorUtils.rgbToHsl(state.rgb.r, state.rgb.g, state.rgb.b);
    state.cmyk = ColorUtils.rgbToCmyk(state.rgb.r, state.rgb.g, state.rgb.b);
    state.oklch = ColorUtils.rgbToOklch(state.rgb.r, state.rgb.g, state.rgb.b);
    
    localStorage.setItem('active_hex', state.hex);
    renderAll();
}

function renderAll() {
    // 1. Update Columns 1
    dom.preview.style.backgroundColor = `#${state.hex}`;
    dom.hexInput.value = state.hex;
    dom.colorPicker.value = `#${state.hex}`;
    dom.rgbOutput.textContent = `rgb(${state.rgb.r}, ${state.rgb.g}, ${state.rgb.b})`;
    dom.hslOutput.textContent = `${Math.round(state.hsl.h)}°, ${Math.round(state.hsl.s)}%, ${Math.round(state.hsl.l)}%`;
    dom.cmykOutput.textContent = `${state.cmyk.c}, ${state.cmyk.m}, ${state.cmyk.y}, ${state.cmyk.k}`;
    dom.oklchOutput.textContent = `${Math.round(state.oklch.l)}%, ${state.oklch.c.toFixed(2)}, ${Math.round(state.oklch.h)}`;

    // Update Color Name
    dom.colorNameDisplay.textContent = ColorUtils.getColorName(state.hex);

    // Update Mixer Inputs
    updateMixerInputs();

    // Update dynamic theme color
    document.documentElement.style.setProperty('--md-sys-color-primary', `#${state.hex}`);

    // Update UI Samples
    updateUISamples();

    // 2. Column 2: Variations
    renderVariations();

    // 3. Column 3: Harmonies
    renderHarmonies();

    // 4. Update WCAG & Best Text
    updateWCAG();
    updateBestText();

    // 5. Saved Palette
    renderSavedPalette();

    // 6. Color Blindness
    renderColorBlindness();
}

function updateMixerInputs() {
    dom.mixerInputs.r.value = state.rgb.r;
    dom.mixerInputs.g.value = state.rgb.g;
    dom.mixerInputs.b.value = state.rgb.b;
    dom.mixerInputs.h.value = Math.round(state.hsl.h);
    dom.mixerInputs.s.value = Math.round(state.hsl.s);
    dom.mixerInputs.l.value = Math.round(state.hsl.l);
}

function updateUISamples() {
    document.querySelectorAll('.sample-btn-primary').forEach(el => el.style.backgroundColor = `#${state.hex}`);
    document.querySelectorAll('.sample-btn-outline').forEach(el => {
        el.style.borderColor = `#${state.hex}`;
        el.style.color = `#${state.hex}`;
    });
    document.querySelectorAll('.sample-dot').forEach(el => el.style.backgroundColor = `#${state.hex}`);
    document.querySelectorAll('.sample-text').forEach(el => el.style.color = `#${state.hex}`);
}

function renderColorBlindness() {
    const types = [
        { name: 'Protanopia', desc: 'No Red' },
        { name: 'Deuteranopia', desc: 'No Green' },
        { name: 'Tritanopia', desc: 'No Blue' },
        { name: 'Achromatopsia', desc: 'No Color' }
    ];

    dom.cbSimulator.innerHTML = '';
    types.forEach(type => {
        const transformed = ColorUtils.simulateBlindness(state.rgb, type.name.toLowerCase());
        const hex = ColorUtils.rgbToHex(transformed.r, transformed.g, transformed.b);
        
        const item = document.createElement('div');
        item.className = 'cb-item';
        item.innerHTML = `
            <div class="cb-preview" style="background-color: #${hex}"></div>
            <span class="label-tiny">${type.name}</span>
        `;
        dom.cbSimulator.appendChild(item);
    });
}

function updateBestText() {
    const whiteRatio = ColorUtils.getContrastRatio(state.rgb, { r: 255, g: 255, b: 255 });
    const blackRatio = ColorUtils.getContrastRatio(state.rgb, { r: 0, g: 0, b: 0 });
    
    const best = whiteRatio > blackRatio ? 'white' : 'black';
    dom.bestTextColor.style.backgroundColor = best === 'white' ? '#FFFFFF' : '#000000';
    dom.bestTextColor.style.color = `#${state.hex}`;
    dom.bestTextColor.textContent = `${best === 'white' ? 'White' : 'Black'} (${Math.max(whiteRatio, blackRatio).toFixed(1)}:1)`;
}

function renderSavedPalette() {
    dom.paletteContainer.innerHTML = '';
    state.palette.forEach((hex, index) => {
        const item = document.createElement('div');
        item.className = 'palette-item';
        item.style.backgroundColor = `#${hex}`;
        item.onclick = (e) => {
            if (e.target.classList.contains('remove-btn')) return;
            updateColorState(hex);
        };

        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-btn material-symbols-outlined';
        removeBtn.textContent = 'close';
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            removeFromPalette(index);
        };

        item.appendChild(removeBtn);
        dom.paletteContainer.appendChild(item);
    });
}

function saveToPalette() {
    if (state.palette.includes(state.hex)) return;
    if (state.palette.length >= 10) state.palette.shift();
    state.palette.push(state.hex);
    localStorage.setItem('saved_palette', JSON.stringify(state.palette));
    renderSavedPalette();
    showToast();
}

function removeFromPalette(index) {
    state.palette.splice(index, 1);
    localStorage.setItem('saved_palette', JSON.stringify(state.palette));
    renderSavedPalette();
}

function updateWCAG() {
    const white = { r: 255, g: 255, b: 255 };
    const black = { r: 0, g: 0, b: 0 };
    
    const whiteRatio = ColorUtils.getContrastRatio(state.rgb, white);
    const blackRatio = ColorUtils.getContrastRatio(state.rgb, black);

    dom.wcagWhiteRatio.textContent = `${whiteRatio.toFixed(1)}:1`;
    dom.wcagBlackRatio.textContent = `${blackRatio.toFixed(1)}:1`;

    renderWCAGBadges(dom.wcagWhiteBadges, whiteRatio);
    renderWCAGBadges(dom.wcagBlackBadges, blackRatio);
}

function renderWCAGBadges(container, ratio) {
    container.innerHTML = '';
    const checks = [
        { label: 'AA Large', threshold: 3 },
        { label: 'AA Normal', threshold: 4.5 },
        { label: 'AAA', threshold: 7 }
    ];
    checks.forEach(c => {
        const badge = document.createElement('span');
        const pass = ratio >= c.threshold;
        badge.className = `badge ${pass ? 'badge-pass' : 'badge-fail'}`;
        badge.textContent = `${c.label} ${pass ? '✓' : '×'}`;
        container.appendChild(badge);
    });
}

function renderVariations() {
    const weights = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    const white = { r: 255, g: 255, b: 255 };
    const black = { r: 0, g: 0, b: 0 };
    const grey = { r: 128, g: 128, b: 128 };

    const genRow = (row, targetColor) => {
        row.innerHTML = '';
        weights.forEach(w => {
            const mixed = ColorUtils.mixColors(state.rgb, targetColor, w);
            const mixedHex = ColorUtils.rgbToHex(mixed.r, mixed.g, mixed.b);
            const box = document.createElement('div');
            box.className = 'variant-box';
            box.style.backgroundColor = `#${mixedHex}`;
            box.innerHTML = `<span class="label-tiny" style="color: ${ColorUtils.getLuminance(mixed.r, mixed.g, mixed.b) > 0.5 ? 'black' : 'white'}">${w}%</span>`;
            box.title = `#${mixedHex}`;
            box.onclick = () => updateColorState(mixedHex);
            row.appendChild(box);
        });
    };

    genRow(dom.tintsRow, white);
    genRow(dom.shadesRow, black);
    genRow(dom.tonesRow, grey);
}

function renderHarmonies() {
    const h = state.hsl.h;
    const s = state.hsl.s;
    const l = state.hsl.l;

    const harmonyTypes = [
        { name: 'complementary', angles: [(h + 180) % 360] },
        { name: 'analogous', angles: [(h + 30) % 360, (h - 30 + 360) % 360] },
        { name: 'triadic', angles: [(h + 120) % 360, (h + 240) % 360] },
        { name: 'tetradic', angles: [(h + 90) % 360, (h + 180) % 360, (h + 270) % 360] },
        { name: 'monochromatic', adjustments: [[0, -20], [0, 20], [-20, 0], [20, 0]] }
    ];

    dom.harmoniesContainer.innerHTML = '';
    harmonyTypes.forEach(type => {
        const group = document.createElement('div');
        group.className = 'harmony-group';
        group.innerHTML = `<div class="harmony-header"><span class="label-large">${translations[currentLang][type.name]}</span></div>`;

        const colorsDiv = document.createElement('div');
        colorsDiv.className = 'harmony-colors';

        const baseBox = createHarmonyBox(state.rgb.r, state.rgb.g, state.rgb.b);
        colorsDiv.appendChild(baseBox);

        if (type.angles) {
            type.angles.forEach(angle => {
                const rgb = ColorUtils.hslToRgb(angle, s, l);
                colorsDiv.appendChild(createHarmonyBox(rgb.r, rgb.g, rgb.b));
            });
        } else if (type.adjustments) {
            type.adjustments.forEach(([ds, dl]) => {
                const ns = Math.max(0, Math.min(100, s + ds));
                const nl = Math.max(0, Math.min(100, l + dl));
                const rgb = ColorUtils.hslToRgb(h, ns, nl);
                colorsDiv.appendChild(createHarmonyBox(rgb.r, rgb.g, rgb.b));
            });
        }

        group.appendChild(colorsDiv);
        dom.harmoniesContainer.appendChild(group);
    });
}

function createHarmonyBox(r, g, b) {
    const hex = ColorUtils.rgbToHex(r, g, b);
    const box = document.createElement('div');
    box.className = 'harmony-box';
    box.style.backgroundColor = `#${hex}`;
    box.title = `#${hex}`;
    box.onclick = () => updateColorState(hex);
    return box;
}

// --- Localization ---
function toggleLang() {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[currentLang][key];
    });
    dom.appTitle.textContent = translations[currentLang].app_title;
    renderAll();
}

// --- Clipboard ---
function showToast() {
    dom.toast.textContent = translations[currentLang].copied;
    dom.toast.classList.add('show');
    setTimeout(() => dom.toast.classList.remove('show'), 2000);
}

// --- Export Hub ---
function updateExportContent() {
    const weights = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    const tints = weights.map(w => ColorUtils.rgbToHex(...Object.values(ColorUtils.mixColors(state.rgb, {r:255,g:255,b:255}, w))));
    const shades = weights.map(w => ColorUtils.rgbToHex(...Object.values(ColorUtils.mixColors(state.rgb, {r:0,g:0,b:0}, w))));

    // CSS
    let css = `:root {\n  --primary: #${state.hex};\n`;
    tints.forEach((h, i) => css += `  --primary-tint-${(i+1)*10}: #${h};\n`);
    shades.forEach((h, i) => css += `  --primary-shade-${(i+1)*10}: #${h};\n`);
    css += `}`;
    document.getElementById('code-css').textContent = css;

    // Tailwind v4
    let tw = `/* Tailwind v4 config (CSS-first) */\n@theme {\n  --color-brand: oklch(${state.oklch.l.toFixed(1)}% ${state.oklch.c.toFixed(3)} ${state.oklch.h.toFixed(1)});\n`;
    tints.forEach((h, i) => {
        const lch = ColorUtils.rgbToOklch(...Object.values(ColorUtils.hexToRgb(h)));
        tw += `  --color-brand-${(i+1)*10}0: oklch(${lch.l.toFixed(1)}% ${lch.c.toFixed(3)} ${lch.h.toFixed(1)});\n`;
    });
    shades.forEach((h, i) => {
        const lch = ColorUtils.rgbToOklch(...Object.values(ColorUtils.hexToRgb(h)));
        tw += `  --color-brand-shade-${(i+1)*10}0: oklch(${lch.l.toFixed(1)}% ${lch.c.toFixed(3)} ${lch.h.toFixed(1)});\n`;
    });
    tw += `}`;
    document.getElementById('code-tailwind').textContent = tw;

    // JSON
    const data = {
        hex: state.hex,
        rgb: state.rgb,
        hsl: state.hsl,
        oklch: state.oklch,
        name: ColorUtils.getColorName(state.hex),
        tints: tints.map(h => `#${h}`),
        shades: shades.map(h => `#${h}`)
    };
    document.getElementById('code-json').textContent = JSON.stringify(data, null, 2);
}

// --- Events ---
dom.hexInput.oninput = (e) => updateColorState(e.target.value);
dom.colorPicker.oninput = (e) => updateColorState(e.target.value.substring(1));
dom.themeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    dom.themeToggle.children[0].textContent = document.body.classList.contains('dark-mode') ? 'light_mode' : 'dark_mode';
};
dom.langToggle.onclick = toggleLang;
dom.saveBtn.onclick = saveToPalette;
dom.exportImageBtn.onclick = exportPaletteImage;

// Mixer Input Listeners
Object.keys(dom.mixerInputs).forEach(key => {
    dom.mixerInputs[key].oninput = () => {
        let hex;
        if (['r', 'g', 'b'].includes(key)) {
            hex = ColorUtils.rgbToHex(
                parseInt(dom.mixerInputs.r.value) || 0,
                parseInt(dom.mixerInputs.g.value) || 0,
                parseInt(dom.mixerInputs.b.value) || 0
            );
        } else {
            const rgb = ColorUtils.hslToRgb(
                parseInt(dom.mixerInputs.h.value) || 0,
                parseInt(dom.mixerInputs.s.value) || 0,
                parseInt(dom.mixerInputs.l.value) || 0
            );
            hex = ColorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        updateColorState(hex);
        dom.hexInput.value = hex;
        dom.colorPicker.value = `#${hex}`;
    };
});

function exportPaletteImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Main Color
    ctx.fillStyle = `#${state.hex}`;
    ctx.fillRect(40, 40, 520, 200);

    // Palette strip
    const colors = state.palette.slice(-5);
    const stripWidth = 520 / Math.max(colors.length, 1);
    colors.forEach((hex, i) => {
        ctx.fillStyle = `#${hex}`;
        ctx.fillRect(40 + i * stripWidth, 260, stripWidth, 60);
        
        ctx.fillStyle = '#333';
        ctx.font = 'bold 12px Roboto';
        ctx.fillText(`#${hex}`, 45 + i * stripWidth, 340);
    });

    // Info
    ctx.fillStyle = '#000';
    ctx.font = '24px Outfit';
    ctx.fillText(ColorUtils.getColorName(state.hex), 40, 380);
    ctx.font = '16px Roboto';
    ctx.fillText(`#${state.hex}`, 500, 380);

    const link = document.createElement('a');
    link.download = `palette-${state.hex}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

dom.exportHubBtn.onclick = () => {
    updateExportContent();
    dom.exportModal.classList.add('show');
};

dom.closeModal.onclick = () => dom.exportModal.classList.remove('show');

dom.helpBtn.onclick = () => dom.helpModal.classList.add('show');
dom.closeHelp.onclick = dom.closeHelpConfirm.onclick = () => dom.helpModal.classList.remove('show');

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`export-content-${btn.getAttribute('data-tab')}`).classList.add('active');
    };
});

dom.copyExportBtn.onclick = () => {
    const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
    const text = document.getElementById(`code-${activeTab}`).textContent;
    navigator.clipboard.writeText(text).then(showToast);
};

document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = () => {
        const targetId = btn.getAttribute('data-target');
        const text = document.getElementById(targetId).textContent;
        navigator.clipboard.writeText(text).then(showToast);
    };
});

// Init
updateColorState(state.activeHex);
dom.hexInput.value = state.activeHex;
dom.colorPicker.value = `#${state.activeHex}`;
