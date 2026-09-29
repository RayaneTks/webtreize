import Image from 'next/image';
import type { Ecran } from '@/lib/data/realisations';
import { cn } from '@/lib/utils';

type DeviceProps = {
  ecran: Ecran;
  /** Largeurs servies par `next/image`, selon la place réelle du cadre. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Un écran d’ordinateur dans une fenêtre de navigateur. La barre d’adresse
 * affiche le domaine public du site, ou le nom de l’outil quand c’est un
 * espace privé — jamais une adresse qui n’existe pas.
 */
export function BrowserFrame({ ecran, sizes, priority = false, className }: DeviceProps) {
  return (
    <div className={cn('device-browser', className)}>
      <div className="device-browser__bar" aria-hidden="true">
        <span className="device-browser__dots">
          <i />
          <i />
          <i />
        </span>
        {ecran.barre ? <span className="device-browser__url">{ecran.barre}</span> : null}
      </div>
      <div className="device-browser__screen">
        <Image
          src={ecran.src}
          alt={ecran.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

/** Un écran de téléphone, avec son îlot posé sur la barre d’état. */
export function PhoneFrame({ ecran, sizes, priority = false, className }: DeviceProps) {
  return (
    <div className={cn('device-phone', className)}>
      <div className="device-phone__body">
        <div className="device-phone__screen">
          <span className="device-phone__island" aria-hidden="true" />
          <Image
            src={ecran.src}
            alt={ecran.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

export function DeviceFrame(props: DeviceProps) {
  return props.ecran.format === 'telephone' ? <PhoneFrame {...props} /> : <BrowserFrame {...props} />;
}
