/*import React, {Component} from 'react';

class Header extends Component{
    render() {
        return (
            <div className="card-header bg-info text-center">
                <b>
                    Layanan Informasi Resep dan Tips Memasak 'Makanan Khas Sulut'
                                    </b>
            </div>
        );
    }
}

export default Header;*/

import React, { Component } from 'react';

class Header extends Component {
  render() {
    const headerStyle = {
      background: '#209b33', // Warna biru turquiose
      color: '#fff', // Warna teks putih
      textAlign: 'center',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Efek bayangan halus
    };

    const titleStyle = {
      fontSize: '24px',
      fontWeight: 'bold',
    };

    return (
      <div className="card-header" style={headerStyle}>
        <b style={titleStyle}>
          Layanan Informasi Resep dan Tips Memasak 'Makanan Khas Manado'
        </b>
      </div>
    );
  }
}

export default Header;
