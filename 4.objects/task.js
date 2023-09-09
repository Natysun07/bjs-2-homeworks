function Student(name, gender, age) {
	this.name = name;
	this.gender = gender;
	this.age = age;
	this.marks = [];

	Student.prototype.setSubject = function(subjectName) {
		this.subject = subjectName;
	}

	Student.prototype.addMarks = function(...marksToAdd) {
		if (this.excluded) {
			console.error(`${this.name} отчислен(а) и не может получать оценки.`);
			return;
		}

		if (!this.marks) {
			this.marks = [];
		}

		this.marks.push(...marksToAdd);
	}

	Student.prototype.getAverage = function() {
		if (!this.marks || this.marks.length === 0) {
			return 0;
		}

		return this.marks.reduce((total, mark) => total + mark, 0) / this.marks.length;
	}

	Student.prototype.exclude = function(reason) {
		delete this.subject;
		delete this.marks;
		this.excluded = reason;
	}
}
