import { Component, EventEmitter, Output } from '@angular/core';
import { Message } from 'primeng/api';
import { AuthService } from '../../../../../auth/services/auth.service';
import { CreateLink } from '../../interfaces/create-link.interface';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.scss']
})
export class CreateLinkComponent {
  /**
   * Event emitted when a link is created.
   */
  @Output() public linkCreated: EventEmitter<void>;

  /**
   * The messages to show in the component.
   */
  public messages: Message[];

  constructor(
    private linksService: LinksService,
    private authService: AuthService
  ) {
    this.messages = [];
    this.linkCreated = new EventEmitter<void>();
  }

  /**
   * Create a link.
   */
  public createLink(link: string): void {
    const createLink: CreateLink = {
      userId: this.authService.getUserData()?.id!,
      url: link
    };

    this.linksService.createLink(createLink).subscribe({
      next: () => {
        this.messages = [{
          severity: 'success',
          summary: 'Success',
          detail: 'Link created successfully.',
          life: 5000
        }];
        this.linkCreated.emit();
      },
      error: () => {
        this.messages = [{
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred creating the link.',
          life: 5000
        }];
      }
    });
  }
}
