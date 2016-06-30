'use strict';

class Fraction {
	constructor(numerator = 0, denominator = 1) {
		let frac;

		//If two numbers-like arguments are passed into the function
		if (!isNaN(numerator) && !isNaN(denominator)) {
			numerator = Number(numerator);
			denominator = Number(denominator);
		}
		//Only a single number is present
		else if (!isNaN(numerator)) {
			numerator = Number(numerator);
		}
		//If a string is passed into the function
		else if (Fraction.isString(numerator)) {
			var number = numerator;
			if (number.indexOf('/') != -1) {
				numerator = Number(number.substring(0, number.indexOf('/')));
				denominator = Number(number.substring(number.indexOf('/') + 1, number.length));
			} else {
				numerator = number;
			}
		}
		else {
			throw new Error('Arguments invalid');
		}

		if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) {
			if (!Number.isInteger(numerator)) {
				numerator = Fraction.decimalToFraction(numerator);
			}

			if (!Number.isInteger(denominator)) {
				denominator = Fraction.decimalToFraction(denominator);
			}

			frac = Fraction.divide(numerator, denominator);
			numerator = frac.numerator;
			denominator = frac.denominator;
		}

		if (denominator == 0) {
			throw new Error('Cannot divide by zero');
		}

		this.numerator = numerator;
		this.denominator = denominator;

		this.simplify();
	}

	multiply(frac) {
		Fraction.correctArgumentLength(1, arguments.length);
		return Fraction.change(this, Fraction.multiply(this, frac));
	}

	divide(frac) {
		Fraction.correctArgumentLength(1, arguments.length);
		return Fraction.change(this, Fraction.divide(this, frac));
	}

	add(frac) {
		Fraction.correctArgumentLength(1, arguments.length);
		return Fraction.change(this, Fraction.add(this, frac));
	}

	subtract(frac) {
		Fraction.correctArgumentLength(1, arguments.length);
		return Fraction.change(this, Fraction.subtract(this, frac));
	}

	simplify() {
		Fraction.correctArgumentLength(0, arguments.length);
		return Fraction.change(this, Fraction.simplify(this));
	}

	toString() {
		return Fraction.toString(this);
	}

	equals(frac) {
		return Fraction.equals(this, frac);
	}

	valueOf() {
		return Fraction.valueOf(this);
	}

	static add(frac1, frac2) {
		Fraction.correctArgumentLength(2, arguments.length);
		frac1 = Fraction.toFraction(frac1)
		frac2 = Fraction.toFraction(frac2)

		let newFrac = frac1;
		newFrac.numerator = frac1.numerator * frac2.denominator + frac1.denominator * frac2.numerator;
		newFrac.denominator = frac1.denominator * frac2.denominator;
		return Fraction.simplify(newFrac);
	}

	static subtract(frac1, frac2) {
		Fraction.correctArgumentLength(2, arguments.length);
		frac1 = Fraction.toFraction(frac1);
		frac2 = Fraction.toFraction(frac2);

		let newFrac = frac1;
		newFrac.numerator = frac1.numerator * frac2.denominator - frac1.denominator * frac2.numerator;
		newFrac.denominator = frac1.denominator * frac2.denominator;
		return this.simplify(newFrac);
	}

	static multiply(frac1, frac2) {
		Fraction.correctArgumentLength(2, arguments.length);
		frac1 = Fraction.toFraction(frac1);
		frac2 = Fraction.toFraction(frac2);

		let newFrac = frac1;
		newFrac.numerator = frac1.numerator * frac2.numerator;
		newFrac.denominator = frac1.denominator * frac2.denominator;
		return Fraction.simplify(newFrac);
	}

	static divide(frac1, frac2) {
		Fraction.correctArgumentLength(2, arguments.length);
		frac1 = Fraction.toFraction(frac1);
		frac2 = Fraction.toFraction(frac2);

		let newFrac = frac1;
		newFrac.numerator = frac1.numerator * frac2.denominator;
		newFrac.denominator = frac1.denominator * frac2.numerator;
		return Fraction.simplify(newFrac);
	}

	static simplify(frac) {
		Fraction.correctArgumentLength(1, arguments.length);
		frac = Fraction.toFraction(frac);

		let gcd = Fraction.greatestCommonDivisor(frac.numerator, frac.denominator);

		if (gcd == 1) {
			return frac;
		}

		frac.numerator /= gcd;
		frac.denominator /= gcd;
		return frac;
	}

	static greatestCommonDivisor(num1, num2) {
		let greater;
		let lesser;

		num1 = Math.abs(num1);
		num2 = Math.abs(num2);
		greater = Math.max(num1, num2);
		lesser = Math.min(num1, num2);

		while (lesser != 0) {
			let t = lesser;
			lesser = greater % lesser;
			greater = t;
		}
		return greater;
	}

	static toString(frac) {
		Fraction.correctArgumentLength(1, arguments.length);

		if (frac.denominator == 1) {
			return '' + frac.numerator;
		}

		return '' + frac.numerator + '/' + frac.denominator;
	}

	static equals(frac1, frac2) {
		Fraction.correctArgumentLength(2, arguments.length);
		frac1 = Fraction.toFraction(frac1);
		frac2 = Fraction.toFraction(frac2);

		frac1 = Fraction.simplify(frac1);
		frac2 = Fraction.simplify(frac2);
		return frac1.numerator == frac2.numerator && frac1.denominator == frac2.denominator;
	}

	static valueOf(frac) {
		Fraction.correctArgumentLength(1, arguments.length);
		frac = Fraction.toFraction(frac);
		return frac.numerator / frac.denominator;
	}

	static correctArgumentLength(ideal, actual) {
		if (ideal != actual) {
			throw new Error('' + ideal + ' arguments needed');
		}
	}

	static change(oldFrac, newFrac) {
		Fraction.correctArgumentLength(2, arguments.length);
		oldFrac.numerator = newFrac.numerator;
		oldFrac.denominator = newFrac.denominator;
		return oldFrac;
	}

	static isString(s) {
		return typeof(s) == 'string' || (typeof(s) == 'object' && s.constructor == String)
	}

	static fromFraction(frac) {
		return typeof(frac) == 'object' && frac.constructor == Fraction;
	}

	static toFraction(x) {
		if (!this.fromFraction(x)) {
			return new Fraction(x);
		}

		return x;
	}

	static decimalToFraction(x) {
		Fraction.correctArgumentLength(1, arguments.length);
		if (isNaN(x)) {
			throw new Error('Argument invalid')
		}

		x = String(x);
		let decLocation = x.indexOf('.');

		if (decLocation != -1) {
			let whole = x.substring(0, decLocation);
			let isNegative = (whole.indexOf('-') != -1)? true: false;
			let remainder = x.substring(decLocation + 1, x.length);
			let nthPlace = Math.pow(10, remainder.length);
			if (isNegative) {
				return this.subtract(new Fraction(Number(whole), 1), new Fraction(Number(remainder), nthPlace))
			} else {
				return this.add(new Fraction(Number(whole), 1), new Fraction(Number(remainder), nthPlace))
			}
		} else {
			return new Fraction(Number(x));
		}
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Fraction;
}
