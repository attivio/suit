import expect from 'expect';
import AuthUtils from 'src/util/AuthUtils';

describe('Test AuthUtils', () => {
  it('Can do Jetty-style obfuscation', () => {
    expect(AuthUtils.obfuscate('SecretPassword123')).toEqual('1fof1j1u1igh1vgt1vn61y101sgo1v1p1ym71v2p1siu1y0q1vnw1vg11idp1iz01fmn'); // eslint-disable-line max-len
  });

  it('Can validate hashed passwords', () => {
    expect(AuthUtils.passwordMatches('', '')).toBeTruthy();
    expect(AuthUtils.passwordMatches('SecretPassword123', 'OBF:1fof1j1u1igh1vgt1vn61y101sgo1v1p1ym71v2p1siu1y0q1vnw1vg11idp1iz01fmn')).toBeTruthy(); // eslint-disable-line max-len
    expect(AuthUtils.passwordMatches('SecretPassword123', 'MD5:512d9845442e46f891bafc22f06b171e')).toBeTruthy(); // eslint-disable-line max-len
  });

  it('Can determine the proper username to display from a user object', () => {
    const user1 = {
      $: {
        name: 'Fred',
        password: 'OBF:1fof1j1u1igh1vgt1vn61y101sgo1v1p1ym71v2p1siu1y0q1vnw1vg11idp1iz01fmn',
        roles: [
          'AIE_ADMIN',
        ],
      },
    };
    const user2 = {
      userId: 'fjohnson',
      firstName: 'Fred',
      lastName: 'Johnson',
      email: 'fjohnson@example.comn',
      fullName: 'Fred Johnson',
    };
    const user3 = {
      userId: 'fjohnson',
      firstName: 'Fred',
      lastName: 'Johnson',
      email: 'fjohnson@example.comn',
      saml: true,
    };
    const user4 = {
      userId: 'fjohnson',
      firstName: 'Fred',
      email: 'fjohnson@example.comn',
      saml: true,
    };
    const user5 = {
      userId: 'fjohnson',
      lastName: 'Johnson',
      email: 'fjohnson@example.comn',
      saml: true,
    };
    const user6 = {
      userId: 'fjohnson',
      email: 'fjohnson@example.comn',
      saml: true,
    };

    expect(AuthUtils.getUserName(user1)).toEqual('Fred');
    expect(AuthUtils.getUserName(user2)).toEqual('Fred Johnson');
    expect(AuthUtils.getUserName(user3)).toEqual('Fred Johnson');
    expect(AuthUtils.getUserName(user4)).toEqual('Fred');
    expect(AuthUtils.getUserName(user5)).toEqual('Johnson');
    expect(AuthUtils.getUserName(user6)).toEqual('fjohnson');
  });
});
