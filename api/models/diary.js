const db = require('../database/connect');

class Diary {

    constructor({ post_id, title, content }) {
        this.id = post_id;
        this.title = title;
        this.content = content;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM diary");
        return response.rows.map(p => new Diary(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM diary WHERE post_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate diary.")
        }
        return new Diary(response.rows[0]);
    }

    static async create(data) {
        const { title, content } = data;
        let response = await db.query("INSERT INTO diary (title, content) VALUES ($1, $2) RETURNING diary_id;",
            [title, content]);
        const newId = response.rows[0].diary_id;
        const newDiary = await Diary.getOneById(newId);
        return newDiary;
    }

    async destroy() {
        let response = await db.query("DELETE FROM diary WHERE diary_id = $1 RETURNING *;", [this.id]);
        return new Diary(response.rows[0]);
    }

}

module.exports = Diary;
