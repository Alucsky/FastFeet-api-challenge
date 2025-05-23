import { Either, left, right } from "@/core/either";
import { UserAlreadyExistsError } from "@/core/errors/errors/user-already-exists-error";
import { User } from "../../enterprise/entities/user";
import { UsersRepository } from "../repositories/users-repository";
import { HashGenerator } from "../cryptography/hash-generator";
import { UserType } from "../../enterprise/entities/value-objects/userType";

interface RegisterUserUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
  userTypeString: string;
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    password,
    userTypeString,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithTheSameCpf = await this.usersRepository.findByCpf(cpf);

    if (userWithTheSameCpf) {
      return left(new UserAlreadyExistsError(cpf));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const userTypeEnum = UserType.fromStringToEnum(userTypeString);

    const user = User.create({
      name,
      cpf,
      password: hashedPassword,
      userType: userTypeEnum,
    });

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
