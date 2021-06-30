import React, { useState } from 'react';

const Daily = () => {

    const [count, setCount] = useState(0);

    return (
        <div>
            <div>
                <label>Uno</label>
                <input type="checkbox" data-id="8" />
            </div>
            <div>
                <label>Dos</label>
                <input type="checkbox" />
            </div>
            <div>
                <label>Tres</label>
                <input type="checkbox" />
            </div>
            <div>
                <label>Cuatro</label>
                <input type="checkbox" />
            </div>
            <div>
                <label>Cinco</label>
                <input type="checkbox" />
            </div>

            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
            </div>

        </div>

        
    )
}

export default Daily