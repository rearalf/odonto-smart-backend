import { ValidationError } from '@nestjs/common';

export function flattenValidationErrors(
  errors: ValidationError[],
  parent: string = '',
): string[] {
  const messages: string[] = [];

  for (const error of errors) {
    const propertyPath = parent
      ? `${parent}.${error.property}`
      : error.property;

    if (error.constraints) {
      for (const message of Object.values(error.constraints)) {
        // Aquí decides cómo mostrar el mensaje
        messages.push(`${message}`);
        // Si prefieres mantener el path, usa esto:
        // messages.push(`${propertyPath}: ${message}`);
      }
    }

    if (error.children?.length) {
      messages.push(...flattenValidationErrors(error.children, propertyPath));
    }
  }

  return messages;
}
