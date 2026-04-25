import { Link } from 'react-router-dom';
import '../App.css';

export interface Crumb {
    label: string;
    to?: string;
}

interface BreadcrumbProps {
    crumbs: Crumb[];
}

function Breadcrumb({ crumbs }: BreadcrumbProps) {
    return (
        <nav className="breadcrumb" aria-label="Breadcrumb">
            {crumbs.map((crumb, i) => {
                const isLast = i === crumbs.length - 1;
                return (
                    <span key={i} className="breadcrumb-item">
                        {!isLast && crumb.to ? (
                            <Link to={crumb.to} className="breadcrumb-link">{crumb.label}</Link>
                        ) : (
                            <span className="breadcrumb-current">{crumb.label}</span>
                        )}
                        {!isLast && <span className="breadcrumb-sep">›</span>}
                    </span>
                );
            })}
        </nav>
    );
}

export default Breadcrumb;
