import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../auth/services/auth.service';
import { Link } from './interfaces/link.inteface';
import { LinksService } from './services/links.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnDestroy {
  /**
   * The subject to stop the subscriptions.
   */
  private unsubscribe$: Subject<void>;

  /**
   * The links for the logged-in user.
   */
  public links: Link[];

  /**
   * The environment configuration.
   */
  public environment: typeof environment;

  constructor(
    private linksService: LinksService,
    private authService: AuthService
  ) {
    this.links = [];
    this.environment = environment;
    this.unsubscribe$ = new Subject();
  }

  /**
   * Prepare the information for the component.
   */
  public ngOnInit(): void {
    this.getLinks();
  }

  /**
   * Clean up the subscriptions.
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Get the links for the logged-in user.
   */
  public getLinks(): void {
    this.linksService
      .getLinks({ user_id: this.authService.getUserData()?.id })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (links: Link[]) => {
          this.links = links;
        }
      });
  }

  /**
   * Delete a link.
   *
   * @param link The link to delete.
   */
  public deleteLink(link: number): void {
    this.linksService
      .deleteLink(link)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.getLinks();
        }
      });
  }
}
