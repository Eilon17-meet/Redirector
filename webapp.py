from flask import *
from flask import session as login_session
from werkzeug.utils import secure_filename

from model import *

app = Flask(__name__)
app.secret_key = "MY_SUPER_SECRET_KEY"

app.delete_all_password = '123'

Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine, autoflush=False)
session = scoped_session(DBSession)

@app.route('/')
@app.route('/search/<string:keyword>')
def index(keyword=None):
    if keyword==None:
        links = session.query(Hyperlink).all()
    else:
        links = session.query(Hyperlink).filter(
            Hyperlink.word.like('%{}%'.format(keyword))).all()
    return render_template('index.html', links=links)

@app.route('/search/')
def to_index():
    return redirect(url_for('index'))

@app.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == 'GET':
        return render_template('add.html', url_value='')
    else:
        if request.form['word'] in (i.word for i in session.query(Hyperlink).all()):
            flash('Word taken. Try something else', category='danger')
            return render_template('add.html', url_value=request.form['url'])
        else:
            h = Hyperlink(
                word=request.form['word'],
                url=request.form['url'],
            )
            session.add(h)
            session.commit()
            flash('Link added', category='success')
            return redirect(url_for('index'))


@app.route('/go/<string:word>')
def go(word):
    link = session.query(Hyperlink).filter_by(word=word).first()
    link.used += 1
    session.commit()
    return redirect(link.url)


@app.route('/delete_all', methods=['POST'])
def delete_all():
    if request.form['password'] == app.delete_all_password:
        session.query(Hyperlink).delete()
        session.commit()
        flash('All deleted', category='success')
        return redirect(url_for('index'))
    else:
        flash('Wrong password', category='danger')
        return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
