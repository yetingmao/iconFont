var fs = require('fs'),
    stat = fs.stat;

/*
 * ����Ŀ¼�е������ļ�������Ŀ¼
 * @param{ String } ��Ҫ���Ƶ�Ŀ¼
 * @param{ String } ���Ƶ�ָ����Ŀ¼
 */
var copy = function (src, dst) {
    // ��ȡĿ¼�е������ļ�/Ŀ¼
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }

        paths.forEach(function (path) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;

            stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }

                // �ж��Ƿ�Ϊ�ļ�
                if (st.isFile()) {
                    // ������ȡ��
                    readable = fs.createReadStream(_src);
                    // ����д����
                    writable = fs.createWriteStream(_dst);
                    // ͨ���ܵ���������
                    readable.pipe(writable);
                }
                // �����Ŀ¼��ݹ��������
                else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
};

// �ڸ���Ŀ¼ǰ��Ҫ�жϸ�Ŀ¼�Ƿ���ڣ���������Ҫ�ȴ���Ŀ¼
var exists = function (src, dst, callback) {
    fs.exists(dst, function (exists) {
        // �Ѵ���
        if (exists) {
            callback(src, dst);
        }
        // ������
        else {
            fs.mkdir(dst, function () {
                callback(src, dst);
            });
        }
    });
};

// ����Ŀ¼
exists('./svg', './svg_Build', copy);