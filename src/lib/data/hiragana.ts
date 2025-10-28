export const hiraganaData = [
	// あ row (a-row)
	{ char: 'あ', romanji: 'a' },
	{ char: 'い', romanji: 'i' },
	{ char: 'う', romanji: 'u' },
	{ char: 'え', romanji: 'e' },
	{ char: 'お', romanji: 'o' },

	// か row (ka-row)
	{ char: 'か', romanji: 'ka' },
	{ char: 'き', romanji: 'ki' },
	{ char: 'く', romanji: 'ku' },
	{ char: 'け', romanji: 'ke' },
	{ char: 'こ', romanji: 'ko' },

	// さ row (sa-row)
	{ char: 'さ', romanji: 'sa' },
	{ char: 'し', romanji: 'shi' },
	{ char: 'す', romanji: 'su' },
	{ char: 'せ', romanji: 'se' },
	{ char: 'そ', romanji: 'so' },

	// た row (ta-row)
	{ char: 'た', romanji: 'ta' },
	{ char: 'ち', romanji: 'chi' },
	{ char: 'つ', romanji: 'tsu' },
	{ char: 'て', romanji: 'te' },
	{ char: 'と', romanji: 'to' },

	// な row (na-row)
	{ char: 'な', romanji: 'na' },
	{ char: 'に', romanji: 'ni' },
	{ char: 'ぬ', romanji: 'nu' },
	{ char: 'ね', romanji: 'ne' },
	{ char: 'の', romanji: 'no' },

	// は row (ha-row)
	{ char: 'は', romanji: 'ha' },
	{ char: 'ひ', romanji: 'hi' },
	{ char: 'ふ', romanji: 'fu' },
	{ char: 'へ', romanji: 'he' },
	{ char: 'ほ', romanji: 'ho' },

	// ま row (ma-row)
	{ char: 'ま', romanji: 'ma' },
	{ char: 'み', romanji: 'mi' },
	{ char: 'む', romanji: 'mu' },
	{ char: 'め', romanji: 'me' },
	{ char: 'も', romanji: 'mo' },

	// や row (ya-row)
	{ char: 'や', romanji: 'ya' },
	{ char: 'ゆ', romanji: 'yu' },
	{ char: 'よ', romanji: 'yo' },

	// ら row (ra-row)
	{ char: 'ら', romanji: 'ra' },
	{ char: 'り', romanji: 'ri' },
	{ char: 'る', romanji: 'ru' },
	{ char: 'れ', romanji: 're' },
	{ char: 'ろ', romanji: 'ro' },

	// わ row (wa-row)
	{ char: 'わ', romanji: 'wa' },
	{ char: 'を', romanji: 'wo' },
	{ char: 'ん', romanji: 'n' },

	// が row (ga-row) - dakuten
	{ char: 'が', romanji: 'ga' },
	{ char: 'ぎ', romanji: 'gi' },
	{ char: 'ぐ', romanji: 'gu' },
	{ char: 'げ', romanji: 'ge' },
	{ char: 'ご', romanji: 'go' },

	// ざ row (za-row) - dakuten
	{ char: 'ざ', romanji: 'za' },
	{ char: 'じ', romanji: 'ji' },
	{ char: 'ず', romanji: 'zu' },
	{ char: 'ぜ', romanji: 'ze' },
	{ char: 'ぞ', romanji: 'zo' },

	// だ row (da-row) - dakuten
	{ char: 'だ', romanji: 'da' },
	{ char: 'ぢ', romanji: 'di' },
	{ char: 'づ', romanji: 'du' },
	{ char: 'で', romanji: 'de' },
	{ char: 'ど', romanji: 'do' },

	// ば row (ba-row) - dakuten
	{ char: 'ば', romanji: 'ba' },
	{ char: 'び', romanji: 'bi' },
	{ char: 'ぶ', romanji: 'bu' },
	{ char: 'べ', romanji: 'be' },
	{ char: 'ぼ', romanji: 'bo' },

	// ぱ row (pa-row) - handakuten
	{ char: 'ぱ', romanji: 'pa' },
	{ char: 'ぴ', romanji: 'pi' },
	{ char: 'ぷ', romanji: 'pu' },
	{ char: 'ぺ', romanji: 'pe' },
	{ char: 'ぽ', romanji: 'po' }
];

// Export basic hiragana only (without dakuten/handakuten)
export const basicHiraganaData = hiraganaData.slice(0, 46);

// Export by difficulty
export const hiraganaByDifficulty = {
	beginner: hiraganaData.slice(0, 46), // Basic 46 characters
	intermediate: hiraganaData.slice(46, 71), // Dakuten (が-ぼ)
	advanced: hiraganaData.slice(71) // Handakuten (ぱ-ぽ)
};
